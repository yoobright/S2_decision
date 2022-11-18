const model = {};
model.done = false;

async function initModel() {
  // create a session
  console.log("init onnx");
  model.S1Session = await ort.InferenceSession.create("./assets/S1_model.onnx");
  console.log("init S1 done");
  const response = await axios({
    method: "get",
    url: "./assets/S2_model.zip",
    responseType: "arraybuffer",
  });

  // jszip extract file S2_model.onnx from response.data
  const zipFile = await JSZip.loadAsync(response.data);
  const onnxFile = await zipFile.file("S2_model.onnx").async("arraybuffer");

  model.S2Session = await ort.InferenceSession.create(onnxFile);
  // model.S2Session = await ort.InferenceSession.create("./assets/S2_model.onnx");
  console.log("init S2 done");
}

// eslint-disable-next-line no-unused-vars
async function inferS1(feat) {
  if (model.done === false) {
    return;
  }
  const inputDim = [1, 19];
  // generate model input
  const input0 = new ort.Tensor(
    new Float32Array(feat) /* data */,
    inputDim /* dims */
  );

  // execute the model
  console.log("run S1");
  const outputs = await model.S1Session.run({ input0: input0 });

  // consume the output
  const outputTensor = outputs.label;
  console.log(`model output tensor: ${outputTensor.data}`);
  return outputTensor.data;
}

// eslint-disable-next-line no-unused-vars
async function inferS2(feat) {
  if (model.done === false) {
    return;
  }

  const inputDim = [1, 5];
  // generate model input
  const input0 = new ort.Tensor(
    new Float32Array(feat) /* data */,
    inputDim /* dims */
  );

  // execute the model
  console.log("run S2");
  const outputs = await model.S2Session.run({ input0: input0 });

  // consume the output
  const outputTensor = outputs.label;
  console.log(`model output tensor: ${outputTensor.data}`);
  return outputTensor.data;
}

initModel().then(() => {
  model.done = true;
});


const ch1_set = new Set([1, 3, 6, 8, 9, 12, 23, 24, 25]);
const ch2_set = new Set([4, 5, 7, 10, 11, 17]);
const ch3_set = new Set([2, 13, 14, 15, 16, 18, 19, 20, 21, 22]);

const pp11_set = new Set([1, 2, 13, 14, 16, 18, 35]);
const pp12_set = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
  35,
]);


// eslint-disable-next-line no-unused-vars
function extractS1Feat(mostLevel, bodyList, chList) {
  var t;
  var feat = [];

  feat.push(mostLevel);

  for (const set_n of [ch1_set, ch2_set, ch3_set]) {
    t = (() => new Set(chList.filter((x) => set_n.has(x))))();
    feat.push(t.size >= 1 ? 1 : 0);
    feat.push(t.size === 1 ? 1 : 0);
    feat.push(t.size >= 2 ? 1 : 0);
    feat.push(t.size === 2 ? 1 : 0);
    feat.push(t.size >= 3 ? 1 : 0);
  }

  t = (() => new Set(bodyList.filter((x) => pp11_set.has(x))))();
  feat.push(t.size >= 1 ? 1 : 0);
  t = (() => new Set(bodyList.filter((x) => pp12_set.has(x))))();
  feat.push(t.size >= 1 ? 1 : 0);

  feat.push(chList.includes(6) ? 1 : 0);

  return feat;
}
