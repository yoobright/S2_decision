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
