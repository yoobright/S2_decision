if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  };
}

function addCheckBox(for_type, element_list, required = "") {
  template =
    "<input type='checkbox' \
    name='{0}' \
    id='{0}' \
    value='{1}' \
    class='{2}'/> \
    <label type='checkbox'>{3}</label>";

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
    "<input type='radio' \
      name='{0}' \
      id='{0}' \
      value='{1}' \
      class='{2}'/> \
      <label type='radio'>{3}</label>";

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
    transitionEffect: "fade",
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

  $.dobPicker({
    daySelector: "#birth_date",
    monthSelector: "#birth_month",
    yearSelector: "#birth_year",
    dayDefault: "",
    monthDefault: "",
    yearDefault: "",
    minimumAge: 0,
    maximumAge: 120,
  });

  // $("#pain_leval_slider").slider();
  var marginSlider = document.getElementById("pain_leval_slider");
  console.log(marginSlider)
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
        mode: 'steps',
        stepped: true,
        density: 10
      },
      format: {
        from: function(value) {
                return parseInt(value);
            },
        to: function(value) {
                return parseInt(value);
            }
        }
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
    ]

    marginSlider.noUiSlider.on("update", function (values, handle) {
      // console.log(values)
      $("#pain_leval_slider .noUi-connect").css("background", change_color_list[values[0]])
      // if (handle) {
      //   console.log(values)
      //   // var color = change_color_list[values]
      //   // $(".noUi-connect").css("propertyname", )
      // }
    });
  }
})(jQuery);



