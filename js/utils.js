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
  "P1.2": "治疗效果不佳",
  "P1.3": "有未治疗的症状或适应症",
  "P2.1": "（可能）发生药物不良事件",
  "C1.1": "不符合指南/处方的药物",
  "C1.4": "不适当的组合（药物与药物或药物与草药或药物与保健品）",
  "C1.5": "药物重复使用（药理作用相同或活性成分相同）",
  "C1.6": "尽管存在适应症，未给予药物治疗或没有给与完整的药物治疗",
  "C3.2": "药物剂量过高",
  "C3.3": "给药频次不足",
  "C3.4": "给药频次过多",
  "C3.5": "用药时间的指示错误，不清晰或遗漏",
};
