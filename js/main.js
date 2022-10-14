function addCheckBox(for_type, element_list, required = "") {
  const template =
    "<label type='checkbox-label' > \
    <input type='checkbox' \
    name='{0}' \
    id='{0}' \
    value='{1}' \
    class='{2}'/> \
    {3}</label>";

  const labelElement = $("label[for='{0}']".format(for_type));
  const UElement = labelElement.next();

  if (UElement.is("div")) {
    if (Array.isArray(element_list[0])) {
      const items = element_list.map((v) =>
        template.format(for_type, v[1].toString(), required, v[0])
      );
      UElement.append(items);
    } else {
      const items = element_list.map((v, i) =>
        template.format(for_type, (i + 1).toString(), required, v)
      );
      UElement.append(items);
    }
  }
}

function addRadio(for_type, element_list, required = "") {
  const template =
    "<label type='radio-label'> \
    <input type='radio' \
      name='{0}' \
      id='{0}' \
      value='{1}' \
      class='{2}'/> \
      {3}</label>";

  const labelElement = $("label[for='{0}']".format(for_type));
  const UElement = labelElement.next();

  if (UElement.is("div")) {
    if (Array.isArray(element_list[0])) {
      const items = element_list.map((v) =>
        template.format(for_type, v[1].toString(), required, v[0])
      );
      UElement.append(items);
    } else {
      const items = element_list.map((v, i) =>
        template.format(for_type, (i + 1).toString(), required, v)
      );
      UElement.append(items);
    }
  }
}

function togglePartView(p) {
  const dataSelceted = p.attr("data_selceted");
  // console.log('svg click!!!!', this.id, data_selceted);
  if (dataSelceted === "true") {
    p.attr("data_selceted", "false");
    p.classed("st1", true);
    p.classed("st1_selected", false);
    p.style("opacity", 0.5);
    p.style("fill", "");
  } else {
    p.attr("data_selceted", "true");
    p.classed("st1", false);
    p.classed("st1_selected", true);
    p.style("opacity", 0.4);
  }
}

function updateBodySelected(bodyId, currentSelect, bodyPloygon) {
  if (bodyId.match(/\d+/u)) {
    togglePartView(currentSelect, bodyId);
    const bodySelect = bodyPloygon.filter("[data_selceted='true']");
    const selectIDList = bodySelect._groups[0].map((value) => {
      return value.id.split("_")[2];
    });

    console.log(selectIDList);
    const selectNameList = selectIDList.map((id) => {
      return bodyKV[id];
    });

    const currentNameList = $("#user_pain_part")
      .text()
      .trim()
      .split(", ")
      .filter((v) => v !== "");

    console.log("select: " + selectNameList);
    console.log("current: " + currentNameList);

    const updateNameList = (function (current, select) {
      if (current.length < select.length) {
        const addNameList = select.filter((v) => current.indexOf(v) === -1);
        console.log("add: " + addNameList);

        return current.concat(addNameList);
      } else if (current.length > select.length) {
        return current.filter((v) => select.indexOf(v) !== -1);
      } else {
        return current;
      }
    })(currentNameList, selectNameList);

    console.log(updateNameList);
    $("#user_pain_part").text(updateNameList.join(", "));
    // console.log(list);
  }
}

const col2_template =
  "<label><input name='dose' type='text' \
class='middle-input' />{0}</label>";

function changeDose(node) {
  const value = $(node).val();
  const index = availableDrugs.indexOf(value);

  if (index !== -1) {
    const table = $(usedDrugTableID).DataTable();
    const thisTr = node.parentElement.parentElement;
    const thisRowIdx = table.row(thisTr).index();
    const colIdx = table.column("drug_dose:name").index();

    table
      .cell(thisRowIdx, colIdx)
      .data(col2_template.format(PCNEData[index].unit));
    // console.log(table.row(thisTr));
    table.columns.adjust().responsive.recalc();
    table.responsive.redisplay();
  }
}

const ch1_set = new Set([1, 3, 6, 8, 9, 12, 23, 24, 25]);
const ch2_set = new Set([4, 5, 7, 10, 11, 17]);
const ch3_set = new Set([2, 13, 14, 15, 16, 18, 19, 20, 21, 22]);

const pp11_set = new Set([1, 2, 13, 14, 16, 18, 35]);
const pp12_set = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
  35,
]);
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

function getDrugClassList(drugID) {
  const drugInfo = PCNEData.find((v) => {
    return v.id === drugID;
  });
  if (drugInfo) {
    return drugInfo.class.split("/");
  }

  return undefined;
}

function isDrugTypeFromDrugClass(drugClassList, drugType) {
  if (drugClassList) {
    const typeRegex = new RegExp("^({0}).*".format(drugType), "u");

    if (drugClassList.filter((v) => typeRegex.test(v)).length >= 1) {
      return true;
    }
  }
  return false;
}

// function isDrugType(drugID, drugType) {
//   const drugClass = getDrugClassList(drugID);
//   if (isDrugTypeFromDrugClass(drugClass, drugType)) {
//     return true;
//   }
//   return false;
// }

function initTypeCounter() {
  const counter = {};

  painDrugTypeList.forEach((painDrugType) => {
    counter[painDrugType] = 0;
  });

  return counter;
}

function genTypeCounter(drugIDList) {
  const counter = initTypeCounter();
  drugIDList.forEach((drugID) => {
    const drugClassList = getDrugClassList(drugID);

    painDrugTypeList.forEach((painDrugType) => {
      if (isDrugTypeFromDrugClass(drugClassList, painDrugType)) {
        counter[painDrugType] = counter[painDrugType] + 1;
      }
    });
  });

  return counter;
}

function getDecDrugTypeFromCounter(counter) {
  // c,e
  if (counter.C > 0 && counter.D >= 0 && counter.E > 0 && counter.F >= 0) {
    return 6;
  }

  // d,e
  if (counter.C === 0 && counter.D > 0 && counter.E > 0 && counter.F >= 0) {
    return 7;
  }

  //  f,d
  if (counter.C === 0 && counter.D > 0 && counter.E === 0 && counter.F > 0) {
    return 8;
  }

  // e,f
  if (counter.C === 0 && counter.D === 0 && counter.E > 0 && counter.F > 0) {
    return 9;
  }

  // c,d
  if (counter.C > 0 && counter.D > 0 && counter.E === 0 && counter.F === 0) {
    return 10;
  }

  // c,f
  if (counter.C > 0 && counter.D >= 0 && counter.E === 0 && counter.F > 0) {
    return 11;
  }

  if (counter.C > 1 && counter.D === 0 && counter.E === 0 && counter.F === 0) {
    return 12;
  }

  if (counter.C === 0 && counter.D === 0 && counter.E === 0 && counter.F > 1) {
    return 13;
  }

  if (counter.C === 0 && counter.D === 0 && counter.E > 1 && counter.F === 0) {
    return 14;
  }

  // 1-5
  if (
    (counter.A > 0 || counter.B > 0) &&
    counter.C === 0 &&
    counter.D === 0 &&
    counter.E === 0 &&
    counter.F === 0
  ) {
    return 1;
  }

  if (
    (counter.A > 0 || counter.B > 0 || (counter.F === 0 && counter.D === 0)) &&
    counter.C === 1 &&
    counter.E === 0
  ) {
    return 2;
  }

  if (
    (counter.A >= 0 || counter.B >= 0) &&
    counter.C === 0 &&
    counter.D >= 1 &&
    counter.E === 0 &&
    counter.F === 0
  ) {
    return 3;
  }

  if (
    (counter.A > 0 || counter.B > 0 || counter.F === 0) &&
    counter.C === 0 &&
    counter.D === 0 &&
    counter.E === 1
  ) {
    return 4;
  }

  if (
    (counter.A >= 0 || counter.B >= 0) &&
    counter.C === 0 &&
    counter.D === 0 &&
    counter.E === 0 &&
    counter.F === 1
  ) {
    return 5;
  }

  return undefined;
}

function getFreqFromTd(td) {
  const checked = $(td).find("input[type=radio]:checked");
  const checkedLabel = checked.parent();
  const res = {};
  const inputV = checkedLabel.find("input.small-input");
  // console.log(inputV);
  if (checked.length === 0) {
    return "";
  }

  if (inputV.length > 0) {
    // console.log("!!!!!");
    res.val = inputV.val().trim();
    if (res.val === "") {
      return "";
    }
  }
  res.id = checked.val();
  // console.log(res);
  return res;
}

function getDoseFromTd(td) {
  const doseVal = $(td).find("input").val().trim();
  const doseUnit = $(td).find("label").text();
  const res = {};

  if (doseVal === "") {
    return "";
  }

  res.val = doseVal;
  res.unit = doseUnit;
  // console.log(res);
  return res;
}

function getDurtionFromTd(td) {
  const checked = $(td).find("input[type=radio]:checked");
  if (checked.length === 0) {
    return "";
  }
  const val = checked.parent().text();
  const id = checked.val();

  return {
    val: val,
    id: id,
  };
}

function getNameFromTd(td) {
  const val = $(td).children("input").val().trim();
  const id = availableDrugsDict[val];

  return {
    val: val,
    id: id,
  };
}

function getAllUsedDrugs() {
  const table = $(usedDrugTableID).DataTable();
  const data = table.rows().nodes();
  // console.log(data);
  const res = [];
  data.each((value, index) => {
    const td = $(value).children("td");

    // console.log(td);
    const name = getNameFromTd(td[1]);
    // if (name === "") {
    //   return;
    // }
    // console.log(name);

    const dose = getDoseFromTd(td[2]);
    // if (dose === "") {
    //   return;
    // }
    // console.log(dose);

    const freq = getFreqFromTd(td[3]);
    // if (freq === "") {
    //   return;
    // }

    // console.log(freq);

    const durtion = getDurtionFromTd(td[4]);
    // if (durtion === "") {
    //   return;
    // }
    // console.log(durtion);
    res.push({ name: name, dose: dose, freq: freq, durtion: durtion });
    // console.log(res);
  });
  return res;
}

function getCompliance() {
  const inputs = $("input[id^='user_compliance_q']:checked").get();
  const scoreList = inputs.map((v) => parseInt($(v).val()));
  const scoreSum = scoreList.reduce(
    (previousVal, currentVal) => previousVal + currentVal,
    0
  );

  if (scoreSum >= 3) {
    return 1;
  } else {
    return 2;
  }
}

function getMostLevel() {
  return parseInt(
    document.getElementById("pain_leval_slider").noUiSlider.get()
  );
}

function getBreakOutType() {
  return parseInt($("input#user_pain_breakout_type:checked").val());
}

function getBreakOutTimes() {
  return parseInt($("input#user_pain_breakout_freq:checked").val());
}

function getChList() {
  return $("input[type=checkbox][name=user_pain_character]:checked")
    .map(function () {
      return parseInt($(this).val());
    })
    .get();
}

function getBodyList() {
  const bodyDoc = document.getElementById("body-view-image").contentDocument;
  const bodyPloygon = d3.select(bodyDoc).selectAll("polygon");
  const bodySelect = bodyPloygon.filter("[data_selceted='true']");
  const bodyList = bodySelect._groups[0].map((value) => {
    return parseInt(value.id.split("_")[2]);
  });
  return bodyList;
}

function processS1() {
  const bodyList = getBodyList();
  const chList = getChList();
  const mostLevel = getMostLevel();
  const feat = extractS1Feat(mostLevel, bodyList, chList);
  console.log(feat);

  inferS1(feat).then((res) => {
    const strOut =
      "most level: {0}\nbody list: {1}\nch list: {2}\ndecision: {3}\n";
    alert(strOut.format(mostLevel, bodyList, chList, res[0]));
  });
}

function processS2() {
  const mostLevel = getMostLevel();
  const breakOutType = getBreakOutType();
  const breakOutTimes = getBreakOutTimes();
  const allUsedDrugs = getAllUsedDrugs();
  const allUsedDrugsID = allUsedDrugs.map((v) => v.name.id);
  console.log("allUsedDrugsID: " + allUsedDrugsID);
  const counter = genTypeCounter(allUsedDrugsID);
  const decDrugType = getDecDrugTypeFromCounter(counter);
  if (decDrugType === undefined) {
    console.log("decDrugType undefined!!!");
    return;
  }
  const compliance = getCompliance();
  const feat = [
    mostLevel,
    breakOutType,
    breakOutTimes,
    decDrugType,
    compliance,
  ];

  inferS2(feat).then((res) => {
    const strOut = "most level: {0}\nbreak out type: {1}\n" +
      "break out times: {2}\nall used Drugs id: {3}\n" +
      "dec drug type: {4}\ncompliance: {5}\n" +
      "decision: {6}\n";

    alert(strOut.format(
      mostLevel,
      breakOutType,
      breakOutTimes,
      allUsedDrugsID,
      decDrugType,
      compliance,
      res[0])
    );
  });
}

// --------------------------------------------------------------------------
// Global Constant

const bodyKV = getJsonSync("./assets/body_kv.json");
const PCNEData = getJsonSync("./assets/PCNE_data.json");
const availableDrugs = PCNEData.map((v) => v.name + v.spec);
const availableDrugsDict = {};
PCNEData.forEach((v) => {
  availableDrugsDict[v.name + v.spec] = v.id;
});
const adverseReactionRegex = /^(L).*/u;
const availableAdverseReactionDrugs = PCNEData.filter(
  (v) =>
    v.class.split("/").filter((v) => adverseReactionRegex.test(v)).length >= 1
).map((v) => v.name + v.spec);

const painDrugTypeList = ["A", "B", "C", "D", "E", "F"];

const drugTypeSetDict = {};
for (const t of painDrugTypeList) {
  const typeRegex = new RegExp("^({0}).*".format(t), "u");
  const typeDrugID = PCNEData.filter(
    (v) => v.class.split("/").filter((v) => typeRegex.test(v)).length >= 1
  )
    .map((v) => v.id)
    .sort((a, b) => {
      return parseInt(a) < parseInt(b);
    });
  drugTypeSetDict[t] = typeDrugID;
}

console.log(drugTypeSetDict);

const usedDrugTableID = "#used-drug-table";
// console.log("availableAdverseReactionDrugs: " + availableAdverseReactionDrugs)

// --------------------------------------------------------------------------

const model = {};
model.done = false;

async function initModel() {
  // create a session
  console.log("init onnx");
  model.S1Session = await ort.InferenceSession.create("./assets/S1_model.onnx");
  console.log("init S1 done");
  model.S2Session = await ort.InferenceSession.create("./assets/S2_model.onnx");
  console.log("init S2 done");
}

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

// document ready
(($) => {
  jQuery.validator.addMethod("stringtest", function (value, element) {
    const length = value.length;
    const name_p = /^([a-zA-Z+.?·?a-zA-Z+]{2,30}$|[\u4e00-\u9fa5+·?\u4e00-\u9fa5+]{2,30}$)/u;
    return this.optional(element) || (length > 0 && name_p.test(value));
  }, "输入正确姓名格式");

  // connect it to a css class
  jQuery.validator.addClassRules({
    "valid-name-check": {
      required: true,
      stringtest: true
    }
  });

  jQuery.extend(jQuery.validator.messages, validator_msg);

  // --------------------------------------------------------------------------
  // steps
  // --------------------------------------------------------------------------

  const form = $("#signup-form");
  form.validate({
    errorPlacement: function errorPlacement(error, element) {
      element.after(error);
    },

    rules: {
      user_pain_reason: {
        required: true,
      },
      user_pain_character: {
        required: true,
      },
      user_pain_aggr_factor: {
        required: true,
      },
      user_pain_reli_factor: {
        required: true,
      },
      user_pain_breakout_type: {
        required: true,
      },
      user_pain_breakout_freq: {
        required: true,
      },
    },

    onfocusout: function (element) {
      $(element).valid();
    },
  });

  form.children("div").steps({
    headerTag: "h3",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    transitionEffectSpeed: 400,
    stepsOrientation: "vertical",
    titleTemplate:
      "<div class='title'><span class='step-number'>#index#</span><span class='step-text'>#title#</span></div>",
    labels: {
      previous: "上一步",
      next: "下一步",
      finish: "提交",
      current: "",
    },
    onStepChanging: function (event, currentIndex, newIndex) {
      if (currentIndex === 0) {
        form
          .parent()
          .parent()
          .parent()
          .append("<div class='footer footer-" + currentIndex + "'></div>");
      }

      if (currentIndex === 1) {
        form
          .parent()
          .parent()
          .parent()
          .find(".footer")
          .removeClass("footer-0")
          .addClass("footer-" + currentIndex + "");
      }

      if (currentIndex === 2) {
        form
          .parent()
          .parent()
          .parent()
          .find(".footer")
          .removeClass("footer-1")
          .addClass("footer-" + currentIndex + "");
      }

      if (currentIndex === 3) {
        form
          .parent()
          .parent()
          .parent()
          .find(".footer")
          .removeClass("footer-2")
          .addClass("footer-" + currentIndex + "");
      }
      // console.log(currentIndex);
      // if(currentIndex === 4) {
      //     form.parent().parent().parent().append('<div class="footer" style="height:752px;"></div>');
      // }
      if (currentIndex > newIndex) {
        return true;
      }

      form.validate().settings.ignore = ":disabled,:hidden";
      return form.valid();
    },
    onFinishing: function (event, currentIndex) {
      form.validate().settings.ignore = ":disabled";
      return form.valid();
    },
    onFinished: function (event, currentIndex) {
      const usedDrugCheck = $(
        "input[type=radio][name=used_drug]:checked"
      ).val();

      if (usedDrugCheck === "0") {
        processS1();
      } else if (usedDrugCheck === "1") {
        processS2();
      }
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
      if (currentIndex === 2) {
        const table = $(usedDrugTableID).DataTable();
        // table.draw();
        table.columns.adjust().responsive.recalc();
      }

      return true;
    },

    onInit: function (event, currentIndex) { },
  });

  // --------------------------------------------------------------------------
  // step 1
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // step 2
  // --------------------------------------------------------------------------

  // body view image
  $("#body-view-image").on("load", () => {
    console.log("load body image");
    const bodyDoc = document.getElementById("body-view-image").contentDocument;
    const bodyPloygon = d3.select(bodyDoc).selectAll("polygon");

    bodyPloygon.attr("data_selceted", "false");

    bodyPloygon.on("click", function () {
      const p = d3.select(this);
      const bodyID = p.attr("id").split("_")[2];

      console.log(bodyID);
      updateBodySelected(bodyID, p, bodyPloygon);
    });

    d3.select(bodyDoc)
      .selectAll("text")
      .filter(function () {
        return !d3.select(this).classed("st_label");
      })
      .on("click", function () {
        const bodyID = d3.select(this).text().trim();
        const idName = "#part_x5F_".concat(bodyID);
        console.log(idName);
        const p = d3.select(this.parentNode.parentNode).select(idName);

        updateBodySelected(bodyID, p, bodyPloygon);
      });
  });

  // userReason
  const userReasonList = ["肿瘤", "肿瘤治疗", "非肿瘤相关性"];
  const userPainReasonTag = "user_pain_reason";

  addCheckBox(userPainReasonTag, userReasonList);

  // userPainCharacter
  const userPainCharacterList = [
    ["酸痛 1", 1],
    ["刺痛 2", 2],
    ["跳痛 3", 3],
    ["钝痛 4", 4],
    ["绞痛 5", 5],
    ["胀痛 6", 6],
    ["坠痛 7", 7],
    ["钻顶样痛 8", 8],
    ["爆裂样痛 9", 9],
    ["撕裂样痛 10", 10],
    ["牵拉样痛 11", 11],
    ["压榨样痛 12", 12],
    ["放电样痛 13", 13],
    ["烧灼样痛 15", 15],
    ["麻木样痛 16", 16],
    ["刀割样痛 17", 17],
    ["轻触痛 19", 19],
    ["无名痛 23", 23],
    ["隐痛 24", 24],
    ["尖锐痛 25", 25],
  ];
  const userPainCharacterTag = "user_pain_character";

  addCheckBox(userPainCharacterTag, userPainCharacterList);

  // userPainAggrFactor
  const userPainAggrFactorList = [
    "行走",
    "活动",
    "体位变化",
    "排便",
    "咳嗽",
    "进食",
    "天气",
    "乏力",
    "精神因素",
  ];
  const userPainAggrFactorTag = "user_pain_aggr_factor";

  addCheckBox(userPainAggrFactorTag, userPainAggrFactorList);

  // userPainReliFactor
  const userPainReliFactorList = [
    "服用镇痛药",
    "环境安静",
    "光线柔和",
    "温度适宜",
    "心理积极",
    "家人陪伴",
  ];
  const userPainReliFactorTag = "user_pain_reli_factor";

  addCheckBox(userPainReliFactorTag, userPainReliFactorList);

  // userPainBreakoutType
  const userPainBreakoutTypeList = [
    ["与特定活动或事件相关联", 1],
    ["发生在按时给予镇痛药物的剂量间隔结束时", 2],
    ["控制不佳的持续性疼痛", 2],
    ["无", 3],
  ];
  const userPainBreakoutTypeTag = "user_pain_breakout_type";

  addRadio(userPainBreakoutTypeTag, userPainBreakoutTypeList);

  // userPainBreakoutFreq
  const userPainBreakoutFreqList = [" ＜3", "≥3"];
  const userPainBreakoutFreqTag = "user_pain_breakout_freq";

  addRadio(userPainBreakoutFreqTag, userPainBreakoutFreqList);

  var marginSlider = document.getElementById("pain_leval_slider");
  // console.log(marginSlider);
  if (marginSlider !== undefined) {
    noUiSlider.create(marginSlider, {
      start: [0],
      step: 1,
      connect: [true, false],
      tooltips: [true],
      range: {
        min: 0,
        max: 10,
      },
      pips: {
        mode: "steps",
        stepped: true,
        density: 10,
      },
      format: {
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return parseInt(value);
        },
      },
    });
    // var marginMin = document.getElementById("value-lower"),
    //   marginMax = document.getElementById("value-upper");
    const change_color_list = [
      "#edccae",
      "#e6b287",
      "#e6b287",
      "#e6b287",
      "#b35d21",
      "#b35d21",
      "#b35d21",
      "#b35d21",
      "#773e14",
      "#773e14",
      "#773e14",
    ];

    marginSlider.noUiSlider.on("update", (values, handle) => {
      console.log(values);
      const value = values[0];
      $("#pain_leval_slider .noUi-connect").css(
        "background",
        change_color_list[value]
      );

      const painDoc =
        document.getElementById("pain-level-image").contentDocument;
      if (painDoc !== null) {
        // console.log(painDoc);
        const painDocSelect = d3.select(painDoc);
        const painG = painDocSelect.selectAll("g").filter(function () {
          return d3.select(this).attr("id").startsWith("pain");
        });
        painG.selectAll("text").style("font-weight", "normal");

        const selectStr = "#pain-desc-level{0}, #pain-label-level{0}".format(
          value
        );

        painDocSelect
          .selectAll(selectStr)
          .selectAll("text")
          .style("font-weight", "bold");

        // flag
        const painFlag = painDocSelect.selectAll("g").filter(function () {
          return d3.select(this).attr("id").startsWith("pain-flag");
        });
        const changeFlag = painDocSelect.select("#pain-flag-level" + value);
        // console.log(painFlag);
        // console.log(changeFlag);

        painFlag.selectAll("path").style("stroke-width", 0.25);
        changeFlag.selectAll("path").style("stroke-width", 2);
      }

      // if (handle) {
      //   console.log(values)
      //   // var color = change_color_list[values]
      //   // $(".noUi-connect").css("propertyname", )
      // }
    });
  }

  // --------------------------------------------------------------------------
  // step 3
  // --------------------------------------------------------------------------

  $("input[type=radio][name=used_drug]").change(function () {
    if (this.value === "1") {
      $("div.used-drug-content").css("display", "unset");
      $("input[name^='user_compliance']").addClass("required");
      const table = $(usedDrugTableID).DataTable();
      // table.draw();
      table.columns.adjust().responsive.recalc();
    } else if (this.value === "0") {
      $("div.used-drug-content").css("display", "none");
      $("input[name^='user_compliance']").removeClass("required");
    }
  });

  // drug table
  const col1_template = "<input class='drug-input'>";
  const col3_dict = {
    "1": "一天<input name='dose' type='text' class='small-input'/>次",
    "2": "每<input name='dose' type='text' class='small-input'/>小时/次",
    "3": "<input name='dose' type='text' class='small-input'/>天/贴",
    "4": "prn（必要时）",
    "5": "每晚",
  };

  //   const col3_template =
  //     "<label><input name='freq' type='radio' value='1' />一天<input name='dose' type='text'\
  //   class='small-input'/>次</label><br>\
  // <label><input name='freq' type='radio' value='2' />每<input name='dose' type='text'\
  // class='small-input'/>小时/次</label><br>\
  // <label><input name='freq' type='radio' value='3' /><input name='dose' type='text'\
  // class='small-input'/>天/贴</label><br>\
  // <label><input name='freq' type='radio' value='4' />prn（必要时）</label><br>\
  // <label><input name='freq' type='radio' value='5' />每晚</label><br> ";

  const col3_template = `

    <label style="display: inline;"></label>
    <div style="margin-left: 16px; margin-right: 16px;" class="dropdown">
    <a class="dropbtn"><span class="ui-icon ui-icon-triangle-1-s"></span></a>
    <div align="left" class="dropdown-content">
      <a value='1'>一天X次</a>
      <a value='2'>每X小时/次</a>
      <a value='3'>X天/贴</a>
      <a value='4'>prn（必要时）</a>
      <a value='5'>每晚</a>
    </div>

  </div>`;


  const col4_template =
    "<label style='margin-right: 16px;'><input name='duration' type='radio' value='1' />>7天</label>\
<label style='margin-right: 16px;'><input name='duration' type='radio' value='2' />≤7天</label><br>";

  const table = $(usedDrugTableID).DataTable({
    language: table_language,
    paging: false,
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.childRowImmediate,
        type: "inline",
        //   renderer: function ( api, rowIdx, columns ) {
        //     var data = $.map( columns, function ( col, i ) {
        //         return col.hidden ?
        //             '<tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
        //                 '<td>'+col.title+':'+'</td> '+
        //                 '<td>'+col.data+'</td>'+
        //             '</tr>' :
        //             '';
        //     } ).join('');

        //     return data ?
        //         $('<table/>').append( data ) :
        //         false;
        // }
      },
    },
    columnDefs: [
      {
        name: "foo",
        className: "dtr-control",
        orderable: false,
        targets: 0,
      },
      {
        name: "drug_name",
        orderable: true,
        targets: 1,
      },
      {
        name: "drug_dose",
        orderable: false,
        targets: 2,
      },
      {
        name: "drug_freq",
        orderable: false,
        targets: 3,
      },
      {
        name: "drug_durtion",
        orderable: false,
        targets: 4,
      },
    ],
    // rowsGroup: [
    //   7
    // ],
    // columnDefs: [
    //   {
    //     orderable: false,
    //     className: "select-checkbox",
    //     targets: 0,
    //   },
    // ],
    order: [[1, "asc"]],
    // select: true,
    info: true,
    // fixedHeader: {
    // header: true,
    // footer: true
    // },
    // fixedHeader: true,
    // scrollY: "240px",
    // scrollCollapse: true,
    dom: "Bfrtip",
    buttons: [
      {
        text: "增加项",
        titleAttr: "增加用药",
        action: function (e, dt, node, config) {
          console.log("add!!!");
          table.row
            .add([
              "",
              col1_template,
              "--",
              col3_template,
              col4_template,
            ])
            .draw(false);

          $("input.drug-input").autocomplete({
            source: availableDrugs,
            change: function (event, ui) {
              changeDose(this);
              // console.log($(this).val());
            },
            close: function (event, ui) {
              changeDose(this);
            },
          });

          // jquery dropdown click
          $(".dropdown-content a").click(function () {
            // console.log("click");
            // console.log($(this).attr("value"));
            const value = $(this).attr("value");
            const elem = $(this).parent().parent().prev();
            $(elem).attr("value", value);
            $(elem).html(col3_dict[value]);
          });

        },
      },

      {
        text: "删除项",
        titleAttr: "删除选中用药",
        action: function (e, dt, node, config) {
          console.log("del!!!");
          table.row(".selected").remove().draw(false);
        },
      },
    ],
  });

  $("{0} tbody".format(usedDrugTableID)).on("click", "tr", function (event) {
    const isTd = $(event.target).is("td");

    if (isTd) {
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
      } else {
        table.$("tr.selected").removeClass("selected");
        $(this).addClass("selected");
      }
    }
  });

  $("input.drug-input").autocomplete({
    source: availableDrugs,
  });

  // userAdverseReaction
  const userAdverseReactionList = [
    "无",
    "便秘",
    "恶心呕吐",
    "谵妄",
    "过度镇静",
    "皮肤瘙痒",
    "呼吸抑制",
    "其他",
  ];
  const userAdverseReactionTag = "user_adverse_reaction";

  addCheckBox(userAdverseReactionTag, userAdverseReactionList);

  // userAdverseReactionDrug
  $("#user_adverse_reaction_drug").tagit({
    availableTags: availableAdverseReactionDrugs,
  });

  function setHealth() {
    $("#user_tumor").val("无");
    $("#user_liver_function").val("1");
    $("#user_kidney_function").val("1");
    $("#user_cardiac_function").val("1");
    $("#user_allergy").val("无");
    $("#user_physical").val("0");
  }

  $("input[name='user_health']").change(() => {
    if ($("input[name='user_health']:checked").val() === "1") {
      console.log("user_health: 1");
      setHealth();
    }
  });



  // end show
  $("body").show();
})(jQuery);
