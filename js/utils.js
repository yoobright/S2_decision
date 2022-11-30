/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
function getJsonSync(url) {
  var text = "";
  $.ajaxSetup({ async: false });
  $.getJSON(url, (data) => {
    text = data;
  });
  $.ajaxSetup({ async: true });
  return text;
}

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/gu, (match, number) => {
      return typeof args[number] !== undefined ? args[number] : match;
    });
  };
}

jQuery.fn.dataTable.Api.register("responsive.redisplay()", function () {
  var responsive = this.context[0].responsive;

  if (responsive) {
    responsive._redrawChildren();
  }
});

const table_language = {
  sProcessing: "处理中...",
  sLengthMenu: "显示 _MENU_ 项结果",
  sZeroRecords: "没有匹配结果",
  sInfo: "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
  sInfoEmpty: "显示第 0 至 0 项结果，共 0 项",
  sInfoFiltered: "(由 _MAX_ 项结果过滤)",
  sInfoPostFix: "",
  sSearch: "搜索:",
  sUrl: "",
  sEmptyTable: "表中数据为空",
  sLoadingRecords: "载入中...",
  sInfoThousands: ",",
  oPaginate: {
    sFirst: "首页",
    sPrevious: "上页",
    sNext: "下页",
    sLast: "末页",
  },
  oAria: {
    sSortAscending: ": 以升序排列此列",
    sSortDescending: ": 以降序排列此列",
  },
  select: {
    rows: {
      _: "选中%d行",
      1: "选中1行",
    },
  },
};

const validator_msg = {
  required: "输入不能为空",
  remote: "请修正此字段",
  email: "请输入有效的电子邮件地址",
  url: "请输入有效的网址",
  date: "请输入有效的日期",
  dateISO: "请输入有效的日期 (YYYY-MM-DD)",
  number: "请输入有效的数字",
  digits: "只能输入数字",
  creditcard: "请输入有效的信用卡号码",
  equalTo: "你的输入不相同",
  max: $.validator.format("请输入不大于 {0} 的数值"),
  min: $.validator.format("请输入不小于 {0} 的数值"),
};


const decsionText = {
  s1: {
    1: "使用非甾体抗炎药或对乙酰氨基酚",
    2: "使用强阿片类药物",
    3: "使用弱阿片类药物",
    4: "使用抗惊厥类药物或抗抑郁类药物",
    5: "使用强阿片类药物+非甾体抗炎药",
    6: "使用强阿片类药物+抗惊厥类药物/抗抑郁类药物",
    7: "使用弱阿片类药物+抗惊厥类药物/抗抑郁类药物",
  },
  s2: {
    1: "停用即释弱阿片",
    2: "停用缓释弱阿片",
    3: "停用即释弱阿片（增加缓释强阿片剂量）",
    4: "停用任一缓释强阿片",
    5: "增加原有即释弱阿片剂量或停用原有即释弱阿片，换用缓释阿片",
    5.1: "停用原有即释弱阿片，换用缓释阿片",
    6: "停用即释弱阿片，增加缓释弱阿片剂量或停用缓释弱阿片，增加即释弱阿片剂量或停用即释弱阿片及缓释弱阿片，换用强阿片",
    6.1: "停用即释弱阿片，增加缓释弱阿片剂量，或停用即释弱阿片及缓释弱阿片，换用缓释强阿片",
    6.2: "停用缓释弱阿片及即释弱阿片，增加强阿片",
    6.3: "停用缓释弱阿片及即释弱阿片，增加缓释强阿片",
    7: "增加原有即释强阿片剂量，或停用即释强阿片，换用缓释强阿片",
    7.1: "停用即释强阿片，换用缓释强阿片",
    7.2: "增加原有即释强阿片剂量，或原有即释强阿片不变，增加缓释强阿片",
    7.3: "原有即释强阿片不变，增加缓释强阿片",
    7.4: "停用任一即释强阿片，换用缓释强阿片或增加另一即释强阿片剂量",
    8: "停用即释强阿片，增加（原有缓释强阿片+即释强阿片）剂量的25%~50%",
    9: "停用缓释弱阿片和即释强阿片，换用缓释强阿片，或停用缓释弱阿片，增加原有即释强阿片剂量",
    9.1: "停用缓释弱阿片和即释强阿片，换用缓释强阿片",
    9.2: "停用缓释弱阿片，增加即释强阿片剂量，或停用缓释弱阿片，增加缓释强阿片",
    9.3: "停用缓释弱阿片，增加缓释强阿片",
    10: "增加原有缓释强阿片剂量的25%~50%",
    11: "增加原有缓释弱阿片剂量或停用缓释弱阿片，增加强阿片",
    11.1: "增加原有缓释弱阿片剂量或停用缓释弱阿片，换用缓释强阿片",
    11.2: "停用缓释弱阿片，增加强阿片",
    11.3: "停用缓释弱阿片，增加缓释强阿片",
    12: "停用即释弱阿片，增加即释强阿片",
    13: "停用即释强阿片，增加（原有缓释强阿片+即释强阿片）剂量的50%~100%",
    14: "增加原有缓释强阿片剂量的同时，增加即释强阿片剂量",
    15: "停用原有即释弱阿片，换用强阿片",
    15.1: "停用原有即释弱阿片，换用缓释强阿片",
    16: "增加原有缓释强阿片剂量的50%~100%",
    17: "增加弱阿片",
    18: "增加强阿片",
  },
};

const previousIssueText = {
  "P1.1": "尽管正确使用药物治疗没有效果",
  "P1.2": "治疗效果不佳",
  "P1.3": "有未治疗的症状或适应症",
  "P2.1": "（可能）发生药物不良事件",
  "P3.1": "不必要的药物治疗",
  "P3.2": "不清楚的问题/投诉，需要进一步澄清（请仅用作转义）",
  "C1.1": "不符合指南/处方的药物",
  "C1.2": "无用药指征",
  "C1.3": "不适当的组合（药物与药物或药物与草药或药物与保健品）",
  "C1.4": "药物重复使用（药理作用相同或活性成分相同）",
  "C1.5": "尽管存在适应症，未给予药物治疗或没有给与完整的药物治疗",
  "c1.6": "为适应症开具的不同药物/活性成分过多",
  "C3.1": "药物剂量过低",
  "C3.2": "药物剂量过高",
  "C3.3": "给药频次不足",
  "C3.4": "给药频次过多",
  "C3.5": "用药时间的指示错误，不清晰或遗漏",
};

function getShortPinyin(wordStr) {
  var idx = -1;
  var MAP = "ABCDEFGHJKLMNOPQRSTWXYZ";
  var boundaryChar = "驁簿錯鵽樲鰒餜靃攟鬠纙鞪黁漚曝裠鶸蜶籜鶩鑂韻糳";

  if (!String.prototype.localeCompare) {
    throw Error("String.prototype.localeCompare not supported.");
  }

  var wordSplit = [...wordStr];
  let res = "";
  for (const w of wordSplit) {
    if (/[\u4e00-\u9fa5]/u.test(w)) {
      for (var i = 0; i < boundaryChar.length; i++) {
        if (boundaryChar[i].localeCompare(w, "zh-CN-u-co-pinyin") >= 0) {
          idx = i;
          break;
        }
      }
      res += MAP[idx];
    }
  }

  return res;
}


var utils = {};
utils.G = {};

utils.G.bodyKV = getJsonSync("./assets/body_kv.json");
utils.G.PCNEData = getJsonSync("./assets/PCNE_data.json");
utils.G.availableDrugs = utils.G.PCNEData.map((v) => v.name + v.spec);
utils.G.availableDrugsPinYin = utils.G.PCNEData.map((v) => getShortPinyin(v.name));
utils.G.availableDrugsDict = {};
utils.G.PCNEData.forEach((v) => {
  utils.G.availableDrugsDict[v.name + v.spec] = v.id;
});
utils.G.adverseReactionRegex = /^(L).*/u;

utils.G.availableAdverseReactionDrugsData = utils.G.PCNEData.filter(
  (v) =>
    v.class.split("/").filter((v) => utils.G.adverseReactionRegex.test(v)).length >= 1
);
utils.G.availableAdverseReactionDrugs = utils.G.availableAdverseReactionDrugsData
  .map((v) => v.name + v.spec);

utils.G.availableAdverseReactionDrugsPinYin = utils.G.availableAdverseReactionDrugsData
  .map((v) => getShortPinyin(v.name));

utils.drugCheck = class {
  static usedDrugInputCheck(allDrugs) {
    for (const drug of allDrugs) {
      const drugName = drug.name;
      const drugDose = drug.dose;
      const drugFreq = drug.freq;
      const drugDuration = drug.duration;
      if (drugName === "" || drugDose === "" || drugFreq === "" ||
        drugDuration === "" || drugFreq.val === "") {
        return false;
      }
    }

    return true;
  }

  static recipeDrugInputCheck(allDrugs) {
    for (const drug of allDrugs) {
      const drugName = drug.name;
      const drugDose = drug.dose;
      const drugFreq = drug.freq;
      if (drugName === "" || drugDose === "" || drugFreq === "" ||
        drugFreq.val === "") {
        return false;
      }
    }

    return true;
  }

  static getFreqTimesPreDay(freq) {
    if (freq.id === "" || freq.val === "") {
      return null;
    }

    if (freq.id === "1") {
      return parseFloat(freq.val);
    }
    if (freq.id === "2") {
      return 24. / parseFloat(freq.val);
    }
    if (freq.id === "3") {
      return 1. / parseFloat(freq.val);
    }
    if (freq.id === "5") {
      return 1.;
    }

    return null;
  }

  static getHighFreqTimesPreDay(strData) {
    const regexp = /([0-9]*)次\/d/ug;
    const matches = strData.matchAll(regexp);
    console.log(matches);
    for (const match of matches) {
      if (match[1] !== "") {
        return parseInt(match[1]);
      }
    }
    return null;
  }

  static getHighDosePreDay(strData) {
    const regexpMG = /([0-9]*)mg\/d/ug;
    const matchesMG = strData.matchAll(regexpMG);
    // console.log(matchesMG);
    for (const match of matchesMG) {
      if (match[1] !== "") {
        return parseInt(match[1]);
      }
    }

    const regexpPiece = /([0-9]*)片\/d/ug;
    const matchesPiece = strData.matchAll(regexpPiece);
    // console.log(matchesPiece);
    for (const match of matchesPiece) {
      if (match[1] !== "") {
        return parseInt(match[1]);
      }
    }

    return null;
  }

  static drugOverdoseCheck(allDrugs) {
    const res = [];
    for (const drug of allDrugs) {
      const drugName = drug.name.val;
      const index = utils.G.availableDrugs.indexOf(drugName);
      if (index !== -1) {
        const drugInfo = utils.G.PCNEData[index];
        const highDosePreDay = this.getHighDosePreDay(drugInfo.high_dose);
        const freqTimesPreDay = this.getFreqTimesPreDay(drug.freq);
        if (freqTimesPreDay === null || highDosePreDay === null) {
          continue;
        }
        const dosePreDay = parseFloat(drug.dose.val) * freqTimesPreDay;
        if (dosePreDay > highDosePreDay) {
          res.push(drugInfo.id);
        }
      }
    }

    return res;

  }


  static drugHighFreqCheck(allDrugs) {
    const res = [];
    for (const drug of allDrugs) {
      const drugName = drug.name.val;
      const index = utils.G.availableDrugs.indexOf(drugName);
      if (index !== -1) {
        const drugInfo = utils.G.PCNEData[index];
        const highFreqTimesPreDay = this.getHighFreqTimesPreDay(drugInfo.exce_freq);
        const freqTimesPreDay = this.getFreqTimesPreDay(drug.freq);
        if (freqTimesPreDay === null || highFreqTimesPreDay === null) {
          continue;
        }

        if (freqTimesPreDay > highFreqTimesPreDay) {
          res.push(drugInfo.id);
        }
      }
    }

    return res;
  }


  static isDrugProp3(durgClassStr) {
    return /C|D|E|F|I|G/u.test(durgClassStr);
  }

  static drugC1_1Check(allDrugs) {
    const prop3List = [];
    for (const drug of allDrugs) {
      const drugName = drug.name.val;
      const index = utils.G.availableDrugs.indexOf(drugName);
      if (index !== -1) {
        const drugInfo = utils.G.PCNEData[index];
        if (this.isDrugProp3(drugInfo.class)) {
          prop3List.push(drugName);
        }
      }
    }

    if (prop3List.length === 1 &&
      utils.G.availableDrugs.indexOf(prop3List[0]) === 3) {
      return true;
    }

    return false;
  }

  static getDrugClassCount(allDrugs) {
    const res = {
      "A1": 0, "A2": 0, "A3": 0, "A4": 0, "A5": 0, "A6": 0, "A7": 0, "A8": 0, "A9": 0, "A10": 0,
      "B1": 0, "B2": 0, "B3": 0, "B4": 0, "B5": 0,
      "C": 0,
      "D": 0,
      "E1": 0, "E2": 0,
      "F1": 0, "F2": 0,
      "G1": 0, "G2": 0,
      "H1": 0, "H2": 0,
      "I1": 0, "I2": 0,
      "J": 0,
      "K": 0,
      "L1": 0, "L2": 0, "L3": 0, "L4": 0, "L5": 0, "L6": 0, "L7": 0, "L8": 0, "L9": 0,
    };

    for (const drug of allDrugs) {
      const drugName = drug.name.val;
      const index = utils.G.availableDrugs.indexOf(drugName);
      if (index !== -1) {
        const drugInfo = utils.G.PCNEData[index];
        const drugClassList = drugInfo.class.split("/");
        for (const drugClass of drugClassList) {
          if (res[drugClass] !== undefined) {
            res[drugClass] += 1;
          }
        }
      }
    }

    return res;
  }

  static drugC1_3Check(drugClassCount) {

    //  药物种类C、D、E1、F1中任一药 + 药物种类K中任一药
    if ((drugClassCount.C > 0 || drugClassCount.D > 0 || drugClassCount.E1 > 0 || drugClassCount.F1 > 0) &&
      drugClassCount.K > 0) {
      return true;
    }
    // 药物种类J中任一药 + 药物种类B2中任一药
    // 药物种类J中任一药 + 药物种类B3中任一药
    // 药物种类J中任一药 + 药物种类B4中任一药
    // 药物种类J中任一药 + 药物种类B5中任一药
    if (drugClassCount.J > 0 &&
      (drugClassCount.B2 > 0 || drugClassCount.B3 > 0 || drugClassCount.B4 > 0 || drugClassCount.B5 > 0)) {
      return true;
    }

    // 药物种类C中任一药 + 药物种类C中另一药
    if (drugClassCount.C > 1) {
      return true;
    }
    // 药物种类C中任一药 + 药物种类D中另一药
    if (drugClassCount.C > 0 && drugClassCount.D > 0) {
      return true;
    }

    // 药物种类F1中任一药 + 药物种类F1中另一药
    if (drugClassCount.F1 > 1) {
      return true;
    }
    // 药物种类E1中任一药 + 药物种类F1中任一药
    if (drugClassCount.E1 > 0 && drugClassCount.F1 > 0) {
      return true;
    }

    // 药物种类E1中任一药 + 药物种类E1中另一药
    if (drugClassCount.E1 > 1) {
      return true;
    }
    // 药物种类A1中任一药 + 药物种类A1中另一药
    if (drugClassCount.A1 > 1) {
      return true;
    }
    // 药物种类A2中任一药 + 药物种类A2中另一药
    if (drugClassCount.A2 > 1) {
      return true;
    }
    // 药物种类G1中任一药 + 药物种类G1中另一药
    if (drugClassCount.G1 > 1) {
      return true;
    }
    // 药物种类H1中任一药 + 药物种类H1中另一药
    if (drugClassCount.H1 > 1) {
      return true;
    }
    // 药物种类I1中任一药 + 药物种类I1中另一药
    if (drugClassCount.I1 > 1) {
      return true;
    }
    // 药物种类J中任一药 + 药物种类J中另一药
    if (drugClassCount.J > 1) {
      return true;
    }
    // 药物种类A5中任一药 + 药物种类A5中另一药
    if (drugClassCount.A5 > 1) {
      return true;
    }
    // 药物种类A8中任一药 + 药物种类A8中另一药
    if (drugClassCount.A8 > 1) {
      return true;
    }
    // 药物种类A6中任一药 + 药物种类A6中另一药
    if (drugClassCount.A6 > 1) {
      return true;
    }
    // 药物种类A9中任一药 + 药物种类A9中另一药
    if (drugClassCount.A9 > 1) {
      return true;
    }

    return false;
  }

  static drugC1_4Check(drugClassCount) {
    // 药物种类G1中任一药 + 药物种类G1中另一药
    // 药物种类H1中任一药 + 药物种类H1中另一药
    // 药物种类I1中任一药 + 药物种类I1中另一药
    // 药物种类J中任一药 + 药物种类J中另一药
    // 药物种类A5中任一药 + 药物种类A5中另一药
    // 药物种类A8中任一药 + 药物种类A8中另一药
    // 药物种类A6中任一药 + 药物种类A6中另一药
    // 药物种类A9中任一药 + 药物种类A9中另一药
    if (drugClassCount.G1 > 1 || drugClassCount.H1 > 1 ||
      drugClassCount.I1 > 1 || drugClassCount.J > 1 ||
      drugClassCount.A5 > 1 || drugClassCount.A8 > 1 ||
      drugClassCount.A6 > 1 || drugClassCount.A9 > 1) {
      return true;
    }

    return false;
  }

  static drugC1_5Check(adverseReactionDrugList, adverseReactionTag) {
    // 存在不良反应便秘，但未使用药物种类L1
    // 存在不良反应恶心呕吐，但未使用药物种类L2
    // 存在不良反应谵妄，但未使用药物种类L3
    // 存在不良反应镇静，但未使用药物种类L4
    // 存在不良反应皮肤瘙痒，但未使用药物种类L5
    // 存在不良反应呼吸抑制，但未使用药物种类L6
    // 存在不良反应止汗，但未使用药物种类L7
    // 存在不良反应利尿，但未使用药物种类L8
    // 存在不良反应胃痉挛，但未使用药物种类L9

    const drugClassList = [];

    for (const drugName of adverseReactionDrugList) {
      const index = utils.G.availableDrugs.indexOf(drugName);
      if (index !== -1) {
        const drugInfo = utils.G.PCNEData[index];
        const classList = drugInfo.class.split("/");
        for (const cls of classList) {
          drugClassList.push(cls);
        }
      }
    }

    for (const tag of adverseReactionTag) {
      if (tag === "1" && !drugClassList.includes("L1") ||
        tag === "2" && !drugClassList.includes("L2") ||
        tag === "3" && !drugClassList.includes("L3") ||
        tag === "4" && !drugClassList.includes("L4") ||
        tag === "5" && !drugClassList.includes("L5") ||
        tag === "6" && !drugClassList.includes("L6") ||
        tag === "7" && !drugClassList.includes("L7") ||
        tag === "8" && !drugClassList.includes("L8") ||
        tag === "9" && !drugClassList.includes("L9")
      ) {
        return true;
      }
    }

    return false;
  }

  static genDrugIssue(allDrugs) {
    const res = {};
    const drugClassCount = this.getDrugClassCount(allDrugs);
    if (this.drugC1_1Check(allDrugs)) {
      res.C1_1 = true;
    }
    if (this.drugC1_3Check(drugClassCount)) {
      res.C1_3 = true;
    }
    if (this.drugC1_4Check(drugClassCount)) {
      res.C1_4 = true;
    }
    // 不良反应
    // eslint-disable-next-line no-undef
    if (this.drugC1_5Check(getAdverseReactionDrugList(), getAdverseReactionTag())) {
      res.C1_5 = true;
    }

    res.C3_4 = this.drugHighFreqCheck(allDrugs);
    res.C3_2 = this.drugOverdoseCheck(allDrugs);

    return res;
  }


  static genDrugIssueInfo(drugIssue) {
    const res = [];
    if (drugIssue === null) {
      return res;
    }

    if (drugIssue.C1_3) {
      res.push(
        `${previousIssueText["P2.1"]}，${previousIssueText["C1.3"]}`
      );
    }

    if (drugIssue.C1_4) {
      res.push(
        `${previousIssueText["P2.1"]}，${previousIssueText["C1.4"]}`
      );
    }

    if (drugIssue.C1_5) {
      res.push(
        `${previousIssueText["P1.3"]}，${previousIssueText["C1.5"]}`
      );
    }


    for (const drugId of drugIssue.C3_4) {
      for (const drug of utils.G.PCNEData) {
        if (drug.id === drugId) {
          res.push(
            `${drug.name}（${previousIssueText["P2.1"]}，${previousIssueText["C3.4"]}）`
          );
          break;
        }
      }
    }

    for (const drugId of drugIssue.C3_2) {
      for (const drug of utils.G.PCNEData) {
        if (drug.id === drugId) {
          res.push(
            `${drug.name}（${previousIssueText["P2.1"]}，${previousIssueText["C3.2"]}）`
          );
          break;
        }
      }
    }

    return res;
  }
};
