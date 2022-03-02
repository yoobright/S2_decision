if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  };
}

function addCheckBox(for_type, element_list, required = "") {
  var template =
    "<label type='checkbox' > \
    <input type='checkbox' \
    name='{0}' \
    id='{0}' \
    value='{1}' \
    class='{2}'/> \
    {3}</label>";

  var labelElement = $("label[for='{0}']".format(for_type));
  UElement = labelElement.next();

  if (UElement.is("div")) {
    for (var i = 0; i < element_list.length; i++) {
      var nodeString = template.format(
        for_type,
        (i + 1).toString(),
        required,
        element_list[i]
      );
      UElement.append(nodeString);
    }
  }
}

function addRadio(for_type, element_list, required = "") {
  template =
    "<label type='radio'> \
    <input type='radio' \
      name='{0}' \
      id='{0}' \
      value='{1}' \
      class='{2}'/> \
      {3}</label>";

  var labelElement = $("label[for='{0}']".format(for_type));
  UElement = labelElement.next();
  if (UElement.is("div")) {
    for (var i = 0; i < element_list.length; i++) {
      var nodeString = template.format(
        for_type,
        (i + 1).toString(),
        required,
        element_list[i]
      );
      UElement.append(nodeString);
    }
  }
}

// userReason
var userReasonList = ["肿瘤", "肿瘤治疗", "非肿瘤相关性"];
var userPainReasonTag = "user_pain_reason";
addCheckBox(userPainReasonTag, userReasonList, "required");

// userPainCharacter
var userPainCharacterList = [
  "酸痛",
  "刺痛",
  "跳痛",
  "钝痛",
  "绞痛",
  "胀痛",
  "坠痛",
  "钻顶样痛",
  "爆裂样痛",
  "撕裂样痛",
  "牵拉样痛",
  "压榨样痛",
  "放电样痛",
  "烧灼样痛",
  "麻木样痛",
  "刀割样痛",
  "轻触痛",
  "无名痛",
  "隐痛",
  "尖锐痛",
];
var userPainCharacterTag = "user_pain_character";
addCheckBox(userPainCharacterTag, userPainCharacterList, "required");

// userPainAggrFactor
var userPainAggrFactorList = [
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
var userPainAggrFactorTag = "user_pain_aggr_factor";
addCheckBox(userPainAggrFactorTag, userPainAggrFactorList, "required");

// userPainReliFactor
var userPainReliFactorList = [
  "服用镇痛药",
  "环境安静",
  "光线柔和",
  "温度适宜",
  "心理积极",
  "家人陪伴",
];
var userPainReliFactorTag = "user_pain_reli_factor";
addCheckBox(userPainReliFactorTag, userPainReliFactorList, "required");

// userPainBreakoutType
var userPainBreakoutTypeList = [
  "与特定活动或事件相关联",
  "发生在按时给予镇痛药物的剂量间隔结束时",
  "控制不佳的持续性疼痛",
];
var userPainBreakoutTypeTag = "user_pain_breakout_type";
addRadio(userPainBreakoutTypeTag, userPainBreakoutTypeList, "required");

// userPainBreakoutFreq
var userPainBreakoutFreqList = [" ＜3", "≥3"];
var userPainBreakoutFreqTag = "user_pain_breakout_freq";
addRadio(userPainBreakoutFreqTag, userPainBreakoutFreqList, "required");

const bodyKV = {
  1: "面部",
  2: "头后部",
  3: "右上臂（内侧）",
  4: "右上臂（外侧）",
  5: "左上臂（内侧）",
  6: "左上臂（外侧）",
  7: "右前臂（内侧）",
  8: "右前臂（外侧）",
  9: "左前臂（内侧）",
  10: "左前臂（外侧）",
  11: "右手",
  12: "左手",
  13: "颈胸部",
  14: "颈背部",
  15: "腹部（前）",
  16: "腹部（后）",
  17: "腰部（前）",
  18: "腰部（后）",
  19: "盆部（右）",
  20: "腰骶部（右）",
  21: "臀部（右）",
  22: "盆部（左）",
  23: "腰骶部（左）",
  24: "臀部（左）",
  25: "大腿（右前）",
  26: "大腿（右后）",
  27: "大腿（左前）",
  28: "大腿（左后）",
  29: "小腿（右前）",
  30: "小腿（右后）",
  31: "小腿（左前）",
  32: "小腿（左后）",
  33: "右足",
  34: "左足",
};

function togglePartView(p, body_id) {
  var dataSelceted = p.attr("data_selceted");
  // console.log('svg click!!!!', this.id, data_selceted);
  if (dataSelceted == "true") {
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
  if (bodyId.match(/\d+/)) {
    togglePartView(currentSelect, bodyId);
    var bodySelect = bodyPloygon.filter("[data_selceted='true']");
    var selectIDList = [];
    for (const value of bodySelect._groups[0]) {
      selectIDList.push(value.id.split("_")[2]);
    }
    // var bodySelect.
    console.log(selectIDList);
    var selectNameList = selectIDList.map(function (id) {
      return bodyKV[id];
    });
    $("#user_pain_part").text(selectNameList.join(", "));
    // console.log(list);
  }
}

(function ($) {
  var form = $("#signup-form");
  form.validate({
    errorPlacement: function errorPlacement(error, element) {
      element.after(error);
    },
    rules: {
      email: {
        email: true,
      },
    },
    onfocusout: function (element) {
      $(element).valid();
    },
  });
  form.children("div").steps({
    headerTag: "h3",
    bodyTag: "fieldset",
    transitionEffect: "slideLeft",
    stepsOrientation: "vertical",
    titleTemplate:
      '<div class="title"><span class="step-number">#index#</span><span class="step-text">#title#</span></div>',
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
          .append('<div class="footer footer-' + currentIndex + '"></div>');
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
      console.log(currentIndex);
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
      alert("Submited");
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
      if (currentIndex == 1) {
        var bodyDoc =
          document.getElementById("body-view-image").contentDocument;
        console.log(bodyDoc);
        var bodyPloygon = d3.select(bodyDoc).selectAll("polygon");
        bodyPloygon.attr("data_selceted", "false");

        bodyPloygon.on("click", function () {
          var p = d3.select(this);
          var bodyID = p.attr("id").split("_")[2];
          console.log(bodyID);
          updateBodySelected(bodyID, p, bodyPloygon);
        });

        d3.select(bodyDoc)
          .selectAll("text")
          .filter(function () {
            return !d3.select(this).classed("st_label");
          })
          .on("click", function () {
            var bodyID = d3.select(this).text().trim();
            var idName = "#part_x5F_".concat(bodyID);
            console.log(idName);
            var p = d3
              .select(this.parentNode.parentNode)
              .select(idName);
            updateBodySelected(bodyID, p, bodyPloygon);;
          });
      }

      if (currentIndex == 2) {
        var table = $("#example").DataTable()
        // table.draw();
        table.columns.adjust().responsive.recalc();
      }
      return true;
    },
  });

  jQuery.extend(jQuery.validator.messages, {
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
  });

  // $.dobPicker({
  //   daySelector: "#birth_date",
  //   monthSelector: "#birth_month",
  //   yearSelector: "#birth_year",
  //   dayDefault: "",
  //   monthDefault: "",
  //   yearDefault: "",
  //   minimumAge: 0,
  //   maximumAge: 120,
  // });

  // $("#pain_leval_slider").slider();
  var marginSlider = document.getElementById("pain_leval_slider");
  console.log(marginSlider);
  if (marginSlider != undefined) {
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
    var change_color_list = [
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

    marginSlider.noUiSlider.on("update", function (values, handle) {
      console.log(values);
      var value = values[0];
      $("#pain_leval_slider .noUi-connect").css(
        "background",
        change_color_list[value]
      );

      var painDoc = document.getElementById("pain-level-image").contentDocument;
      if (painDoc != null) {
        // console.log(painDoc);
        var painDocSelect = d3.select(painDoc);
        var painG = painDocSelect.selectAll("g").filter(function () {
          return d3.select(this).attr("id").startsWith("pain");
        });
        painG.selectAll("text").style("font-weight", "normal");

        var prefixList = ["#pain-desc-level", "#pain-label-level"];
        for (i = 0; i < prefixList.length; i++) {
          changeID = prefixList[i] + value;
          changeG = painDocSelect.select(changeID);
          changeG.selectAll("text").style("font-weight", "bold");
          // console.log(changeG.select("text"));
        }

        // flag
        var painFlag = painDocSelect.selectAll("g").filter(function () {
          return d3.select(this).attr("id").startsWith("pain-flag");
        });
        // console.log(painFlag);
        painFlag.selectAll("path").style("stroke-width", 0.25);
        var changeFlag = painDocSelect.select("#pain-flag-level" + value);
        // console.log(changeFlag);
        changeFlag.selectAll("path").style("stroke-width", 2);
      }

      // if (handle) {
      //   console.log(values)
      //   // var color = change_color_list[values]
      //   // $(".noUi-connect").css("propertyname", )
      // }
    });
  }
})(jQuery);

var col1_template = "<input class='drug-input'>";

var col2_template =
  "<label><input name='freq' type='radio' value='' />一天    次</label><br>\
<label><input name='freq' type='radio' value='' />每   小时/次</label><br>\
<label><input name='freq' type='radio' value='' />   天/贴</label><br>\
<label><input name='freq' type='radio' value='' />prn（必要时）</label><br>\
<label><input name='freq' type='radio' value='' />每晚</label><br> ";
var col3_template = "mg/片";

var col4_template =
  "<label><input name='duration' type='radio' value='' />>7天</label><br>\
<label><input name='duration' type='radio' value='' />≤7天</label><br>";

var col5_template =
  "<label><input name='duration' type='checkbox' value='' />无</label><br>\
<label><input name='duration' type='checkbox' value='' />便秘</label><br>\
<label><input name='duration' type='checkbox' value='' />恶心呕吐</label><br>\
<label><input name='duration' type='checkbox' value='' />谵妄</label><br>\
<label><input name='duration' type='checkbox' value='' />过度镇静</label><br>\
<label><input name='duration' type='checkbox' value='' />皮肤瘙痒</label><br>\
<label><input name='duration' type='checkbox' value='' />呼吸抑制</label><br>\
<label><input name='duration' type='checkbox' value='' />其他</label><br>";

var col6_template = "";

var col7_template =
  "<label>您是否有时会忘记服药？</label><br>\
<input name='ans1' type='radio' value=''/><span style='margin-right: 10;'>是</span>\
<input name='ans1' type='radio' value=''/><span style='margin-right: 10;'>否</span>\
<br>\
<label>您是否有时不注意服药？</label><br>\
<input name='ans1' type='radio' value=''/><span style='margin-right: 10;'>是</span>\
<input name='ans1' type='radio' value=''/><span style='margin-right: 10;'>否</span>\
<br>\
<label>您自觉症状好转时是否会自行停药？</label><br>\
<input name='ans1' type='radio' value=''/><span style='margin-right: 10;'>是</span>\
<input name='ans1' type='radio' value=''/><span style='margin-right: 10;'>否</span>\
<br>\
<label>您服药后自觉症状更糟时是否曾停止服药？</label><br>\
<input name='ans1' type='radio' value=''/><span style='margin-right: 10;'>是</span>\
<input name='ans1' type='radio' value=''/><span style='margin-right: 10;'>否</span>>";

$(function () {
  var availableTags = [
    "羟考酮缓释片10mg",
    "硫酸吗啡缓释片10mg",
    "芬太尼透皮贴剂4.2mg",
    "盐酸曲马多缓释片100mg",
    "氨酚羟考酮片5mg:325mg",
    "双氯芬酸钠双释放肠溶胶囊75mg",
    "塞来昔布胶囊200mg",
    "加巴喷丁胶囊300mg",
    "硫酸吗啡片10mg",
    "盐酸阿米替林片25mg",
    "盐酸度洛西汀肠溶胶囊30mg",
    "艾瑞昔布片100mg",
    "尼美舒利片100mg",
    "醋酸泼尼松片5mg",
    "对乙酰氨基酚片100mg",
    "布洛芬缓释胶囊300mg",
    "盐酸布桂嗪片30mg",
    "盐酸哌替啶注射液2ml:100mg",
    "地佐辛注射液1ml:5mg",
    "盐酸布桂嗪注射液2ml:100mg",
    "美洛昔康片7.5mg",
    "地西泮注射液2ml:10mg",
    "喷他佐辛注射液1ml:30mg",
    "丁丙诺菲透皮贴剂5mg",
    "盐酸氨溴索片30mg",
    "草乌甲素片0.4mg",
    "依托考昔片60mg",
    "普瑞巴林胶囊75mg",
    "可待因桔梗片12mg",
    "盐酸吗啡注射液1 ml:10mg",
    "醋酸地塞米松片750mg",
    "盐酸乙哌立松片50mg",
    "吲哚美辛片25mg",
    "巴氯芬片10mg",
    "盐酸吗啡注射液1 ml:10mg",
    "盐酸曲马多注射液1 ml:50mg",
    "硫酸吗啡栓10mg",
    "磷酸可待因片15mg",
    "氟比洛芬凝胶贴膏40mg",
    "盐酸替扎尼定片1mg",
    "盐酸文拉法辛缓释胶囊75mg",
    "苯甲酸利扎曲普坦胶囊5mg",
    "氟比洛芬酯注射液5ml:50mg",
    "卡马西平片100mg",
    "利伐沙班片15mg",
    "双氯芬酸栓50mg",
    "盐酸纳洛酮注射液1mg:1mg",
    "地塞米松针5mg",
    "硫酸四氢帕马丁注射液2ml:60mg",
    "阿普唑仑片400mg",
    "注射用帕瑞昔布钠30mg",
    "盐酸曲马多片50mg",
    "枸橼酸芬太尼注射液2ml:0.1mg",
    "酒石酸布托啡诺注射液1ml:1mg",
    "吲哚布芬片200mg",
    "洛索洛芬钠片60mg",
    "盐酸氢吗啡酮注射液2ml:2mg",
    "双氯芬酸钠盐酸利多卡因注射液2ml",
    "地西泮片2.5mg",
    "盐酸羟考酮注射液2ml:20mg",
    "盐酸羟考酮注射液1ml:10mg",
    "双氯芬酸钠肠溶片25mg",
    "双氯芬酸钠肠溶片75mg",
    "加巴喷丁胶囊100mg",
    "洛芬待因缓释片0.2g:13mg",
    "对乙酰氨基酚缓释片650mg",
    "酮咯酸氨丁三醇注射液1ml:30mg",
    "吲哚美辛缓释片25mg",
    "盐酸舍曲林片50mg",
    "盐酸帕罗西汀肠溶缓释片12.5mg",
    "氢溴酸西酞普兰片20mg",
    "盐酸米那普仑片25mg",
    "盐酸多塞平片25mg",
    "奥氮平片5mg",
    "盐酸安非他酮片75mg",
    "安非他酮缓释片150mg",
    "米氮平片30mg",
    "萘普生片100mg",
    "盐酸氯米帕明注射液2ml:25mg",
    "盐酸丙米嗪片12.5mg",
    "氟哌噻吨美利曲辛片0.5mg:10mg",
    "盐酸氟西汀胶囊20mg",
    "马来酸氟伏沙明片50mg",
    "草酸艾司西酞普兰片10mg",
    "吗氯贝胺片100mg",
    "盐酸司来吉兰片5mg",
    "氯硝西泮片2mg",
    "艾司唑仑片1mg",
    "比沙可啶栓10mg",
    "通便灵胶囊250mg",
    "麻仁胶囊350mg",
    "甲氧氯普胺片5mg",
    "氟哌啶醇片2mg",
    "盐酸格拉司琼片3ml:3mg",
    "盐酸昂丹司琼片8mg",
    "利培酮片1mg",
    "盐酸哌甲酯片10mg",
    "盐酸西替利嗪片10mg",
    "盐酸苯海拉明片25mg",
    "盐酸异丙嗪片25mg",
    "盐酸羟嗪片25mg",
    "多库酯钠片100mg",
    "酚酞片100mg",
    "消旋山莨菪碱片5mg",
    "呋塞米片20mg",
    "氯雷他定片10mg",
    "枸橼酸莫沙必利片5mg",
    "阿司匹林肠溶片100mg",
    "苯甲酸利扎曲普坦胶囊5mg",
    "羟考酮缓释片40mg",
    "硫酸吗啡缓释片30mg",
    "硫酸吗啡缓释片60mg",
    "硫酸吗啡片20mg",
    "硫酸吗啡片30mg",
    "美洛昔康注射液1.5ml:15mg",
    "吲哚美辛肠溶片25mg",
    "盐酸曲马多注射液2ml:100mg",
    "氟比洛芬缓释片100mg",
    "利伐沙班片10mg",
    "利伐沙班片20mg",
    "盐酸帕罗西汀肠溶缓释片25mg",
    "奥氮平片10mg",
    "盐酸安非他酮缓释片150mg",
    "米氮平口腔崩解片15mg",
    "盐酸丙米嗪片25mg",
    "比沙可啶肠溶片5mg",
    "盐酸格拉司琼胶囊1mg",
  ];

  $(document).ready(function () {
    var table = $("#example").DataTable({
      language: {
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
      },

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
          className: "dtr-control",
          orderable: false,
          targets: 0,
        },
      ],
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
      fixedHeader: {
        header: true,
        // footer: true
      },
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
                col2_template,
                col3_template,
                col4_template,
                col5_template,
                col6_template,
                col7_template,
              ])
              .draw(false);

            $("input.drug-input").autocomplete({
              source: availableTags,
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

    // $("#addRow").on("click", function () {
    //   table.row
    //     .add(["~", "System Architect", ss, "33", "2011/04/25", "$3,120"])
    //     .draw();
    // });

    // $("#delRow").on("click", function () {
    //   table.row('.selected').remove().draw( false );
    // });

    $("#example tbody").on("click", "tr", function (event) {
      var isTd = $(event.target).is("td");
      
      if (isTd) {
        if ($(this).hasClass("selected")) {
          $(this).removeClass("selected");
        } else {
          table.$("tr.selected").removeClass("selected");
          $(this).addClass("selected");
        }
      }
    });
  });

  $("input.drug-input").autocomplete({
    source: availableTags,
  });
});



// $(document).ready(function () {
// var bodyDoc = document.getElementById("body-view-image").contentDocument;
// console.log(bodyDoc)
// var bodyPloygon = d3.select(bodyDoc).selectAll("polygon")
// console.log(bodyPloygon)
// bodyPloygon.attr("data_selceted", "false");

// bodyPloygon.on("click", function () {
//   var p = d3.select(this);
//   var body_id = p.attr("id").split("_")[2];
//   console.log(body_id);
//   // if (body_id.match(/\d+/)) {
//   //   togglePartView(p, body_id);
//   // }
// });
// });
