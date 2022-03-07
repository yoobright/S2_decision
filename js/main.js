if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  };
}

function getJsonSync(url) {
  var text = "";
  $.ajaxSetup({ async: false });
  $.getJSON(url, (data) => {
    text = data;
  });
  $.ajaxSetup({ async: true });
  return text;
}

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
    for (let i = 0; i < element_list.length; i++) {
      const nodeString = template.format(
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
    for (let i = 0; i < element_list.length; i++) {
      const nodeString = template.format(
        for_type,
        (i + 1).toString(),
        required,
        element_list[i]
      );

      UElement.append(nodeString);
    }
  }
}

const bodyKV = getJsonSync("./assets/body_kv.json");
const PCNEData = getJsonSync("./assets/PCNE_data.json");
const availableDrugs = PCNEData.map((v) => v["name"] + v["spec"]);
const adverseReactionRegex = /^(L).*/;
const availableAdverseReactionDrugs = PCNEData.filter(
  (v) =>
    v["class"].split("/").filter((v) => adverseReactionRegex.test(v)).length >=
    1
).map((v) => v["name"] + v["spec"]);
// console.log("availableAdverseReactionDrugs: " + availableAdverseReactionDrugs)

function togglePartView(p, body_id) {
  const dataSelceted = p.attr("data_selceted");
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
    const bodySelect = bodyPloygon.filter("[data_selceted='true']");
    const selectIDList = bodySelect._groups[0].map(function (value) {
      return value.id.split("_")[2];
    });

    console.log(selectIDList);
    const selectNameList = selectIDList.map(function (id) {
      return bodyKV[id];
    });

    const currentNameList = $("#user_pain_part")
      .text()
      .trim()
      .split(", ")
      .filter((v) => v != "");

    console.log("select: " + selectNameList);
    console.log("current: " + currentNameList);
    if (currentNameList.length < selectNameList.length) {
      const addNameList = selectNameList.filter(function (v, i) {
        return currentNameList.indexOf(v) == -1;
      });
      console.log("add: " + addNameList);

      var updateNameList = currentNameList.concat(addNameList);
    } else if (currentNameList.length > selectNameList.length) {
      var updateNameList = currentNameList.filter(function (v, i) {
        return selectNameList.indexOf(v) != -1;
      });
    } else {
      var updateNameList = currentNameList;
    }

    console.log(updateNameList);
    $("#user_pain_part").text(updateNameList.join(", "));
    // console.log(list);
  }
}


(function ($) {
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
    
      if (currentIndex == 2) {
        const table = $("#example").DataTable();
        // table.draw();
        table.columns.adjust().responsive.recalc();
      }
      
      return true;
    },

    onInit: function (event, currentIndex) {},
  });

  // --------------------------------------------------------------------------
  // step 1
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // step 2
  // --------------------------------------------------------------------------

  // body view image
  $("#body-view-image").on("load", function () {
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
    "与特定活动或事件相关联",
    "发生在按时给予镇痛药物的剂量间隔结束时",
    "控制不佳的持续性疼痛",
  ];
  const userPainBreakoutTypeTag = "user_pain_breakout_type";

  addRadio(userPainBreakoutTypeTag, userPainBreakoutTypeList);

  // userPainBreakoutFreq
  const userPainBreakoutFreqList = [" ＜3", "≥3"];
  const userPainBreakoutFreqTag = "user_pain_breakout_freq";

  addRadio(userPainBreakoutFreqTag, userPainBreakoutFreqList);

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

    marginSlider.noUiSlider.on("update", function (values, handle) {
      console.log(values);
      const value = values[0];
      $("#pain_leval_slider .noUi-connect").css(
        "background",
        change_color_list[value]
      );

      const painDoc =
        document.getElementById("pain-level-image").contentDocument;
      if (painDoc != null) {
        // console.log(painDoc);
        const painDocSelect = d3.select(painDoc);
        const painG = painDocSelect.selectAll("g").filter(function () {
          return d3.select(this).attr("id").startsWith("pain");
        });
        painG.selectAll("text").style("font-weight", "normal");
        const prefixList = ["#pain-desc-level", "#pain-label-level"];

        for (i = 0; i < prefixList.length; i++) {
          changeID = prefixList[i] + value;
          changeG = painDocSelect.select(changeID);
          changeG.selectAll("text").style("font-weight", "bold");
          // console.log(changeG.select("text"));
        }

        // flag
        const painFlag = painDocSelect.selectAll("g").filter(function () {
          return d3.select(this).attr("id").startsWith("pain-flag");
        });
        // console.log(painFlag);
        painFlag.selectAll("path").style("stroke-width", 0.25);
        const changeFlag = painDocSelect.select("#pain-flag-level" + value);
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

  // --------------------------------------------------------------------------
  // step 3
  // --------------------------------------------------------------------------

  // drug table
  const col1_template = "<input class='drug-input'>";

  const col2_template =
    "<label><input name='freq' type='radio' value='' />一天<input name='dose' type='text'\
  class='small-input'/>次</label><br>\
<label><input name='freq' type='radio' value='' />每<input name='dose' type='text'\
class='small-input'/>小时/次</label><br>\
<label><input name='freq' type='radio' value='' /><input name='dose' type='text'\
class='small-input'/>天/贴</label><br>\
<label><input name='freq' type='radio' value='' />prn（必要时）</label><br>\
<label><input name='freq' type='radio' value='' />每晚</label><br> ";
  const col3_template =
    "<label><input name='dose' type='text' \
class='middle-input' />{0}</label>";

  const col4_template =
    "<label><input name='duration' type='radio' value='' />>7天</label><br>\
<label><input name='duration' type='radio' value='' />≤7天</label><br>";

  const col5_template =
    "<label><input name='duration' type='checkbox' value='' />无</label><br>\
<label><input name='duration' type='checkbox' value='' />便秘</label><br>\
<label><input name='duration' type='checkbox' value='' />恶心呕吐</label><br>\
<label><input name='duration' type='checkbox' value='' />谵妄</label><br>\
<label><input name='duration' type='checkbox' value='' />过度镇静</label><br>\
<label><input name='duration' type='checkbox' value='' />皮肤瘙痒</label><br>\
<label><input name='duration' type='checkbox' value='' />呼吸抑制</label><br>\
<label><input name='duration' type='checkbox' value='' />其他</label><br>";

  const col6_template = "";

  const table = $("#example").DataTable({
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
        name: "drug_freq",
        orderable: false,
        targets: 2,
      },
      {
        name: "drug_dose",
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
              col2_template,
              "",
              col4_template,
              // col5_template,
              // col6_template,
              // col7_template,
            ])
            .draw(false);

          $("input.drug-input").autocomplete({
            source: availableDrugs,
            change: function (event, ui) {
              const val = $(this).val();
              const index = availableDrugs.indexOf(val);

              if (index != -1) {
                const table = $("#example").DataTable();
                const thisTr = this.parentElement.parentElement;
                const thisRowIdx = table.row(thisTr).index();
                const colIdx = table.column("drug_dose:name").index();

                table
                  .cell(thisRowIdx, colIdx)
                  .data(col3_template.format(PCNEData[index]["unit"]));
                // console.log(table.row(thisTr));
              }
            },
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

  $("#example tbody").on("click", "tr", function (event) {
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
})(jQuery);
