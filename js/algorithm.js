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
