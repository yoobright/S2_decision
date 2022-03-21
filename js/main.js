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
    const items = element_list.map((v, i) =>
      template.format(for_type, (i + 1).toString(), required, v)
    );

    UElement.append(items);
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
    const items = element_list.map((v, i) =>
      template.format(for_type, (i + 1).toString(), required, v)
    );

    UElement.append(items);
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

    table.responsive.redisplay();
  }
}

// --------------------------------------------------------------------------
// Global Constant

const bodyKV = getJsonSync("./assets/body_kv.json");
const PCNEData = getJsonSync("./assets/PCNE_data.json");
const availableDrugs = PCNEData.map((v) => v.name + v.spec);
const adverseReactionRegex = /^(L).*/u;
const availableAdverseReactionDrugs = PCNEData.filter(
  (v) =>
    v.class.split("/").filter((v) => adverseReactionRegex.test(v)).length >= 1
).map((v) => v.name + v.spec);

const usedDrugTableID = "#used-drug-table";
// console.log("availableAdverseReactionDrugs: " + availableAdverseReactionDrugs)

// --------------------------------------------------------------------------

// document ready
(($) => {
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
    transitionEffect: "slideLeft",
    stepsOrientation: "vertical",
    titleTemplate:
      "<div class=\"title\"><span class=\"step-number\">#index#</span><span class=\"step-text\">#title#</span></div>",
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
          .append("<div class=\"footer footer-" + currentIndex + "\"></div>");
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
      // alert("Submited");
      // console.log($("input[type=radio][name=used_drug]").val());
      if ($("input[type=radio][name=used_drug]:checked").val() === "0") {
        const bodyDoc = document.getElementById("body-view-image").contentDocument;
        const bodyPloygon = d3.select(bodyDoc).selectAll("polygon");
        const bodySelect = bodyPloygon.filter("[data_selceted='true']");
        const bodyList = bodySelect._groups[0].map((value) => {
          return value.id.split("_")[2];
        });

        const chList = $("input[type=checkbox][name=user_pain_character]:checked")
          .map(function() {return $(this).val();}).get();
        const mostLevel  = document.getElementById("pain_leval_slider").noUiSlider.get();

        console.log(bodyList);
        console.log(chList);
        console.log(mostLevel);
        alert("Submited");
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

    onInit: function (event, currentIndex) {},
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
    "无",
  ];
  const userPainBreakoutTypeTag = "user_pain_breakout_type";

  addRadio(userPainBreakoutTypeTag, userPainBreakoutTypeList);

  // userPainBreakoutFreq
  const userPainBreakoutFreqList = [" ＜3", "≥3"];
  const userPainBreakoutFreqTag = "user_pain_breakout_freq";

  addRadio(userPainBreakoutFreqTag, userPainBreakoutFreqList);

  var marginSlider = document.getElementById("pain_leval_slider");
  console.log(marginSlider);
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
    } else if (this.value === "0") {
      $("div.used-drug-content").css("display", "none");
      $("input[name^='user_compliance']").removeClass("required");
    }
  });

  // drug table
  const col1_template = "<input class='drug-input'>";

  const col3_template =
    "<label><input name='freq' type='radio' value='' />一天<input name='dose' type='text'\
  class='small-input'/>次</label><br>\
<label><input name='freq' type='radio' value='' />每<input name='dose' type='text'\
class='small-input'/>小时/次</label><br>\
<label><input name='freq' type='radio' value='' /><input name='dose' type='text'\
class='small-input'/>天/贴</label><br>\
<label><input name='freq' type='radio' value='' />prn（必要时）</label><br>\
<label><input name='freq' type='radio' value='' />每晚</label><br> ";

  const col4_template =
    "<label><input name='duration' type='radio' value='' />>7天</label><br>\
<label><input name='duration' type='radio' value='' />≤7天</label><br>";

  //   const col5_template =
  //     "<label><input name='duration' type='checkbox' value='' />无</label><br>\
  // <label><input name='duration' type='checkbox' value='' />便秘</label><br>\
  // <label><input name='duration' type='checkbox' value='' />恶心呕吐</label><br>\
  // <label><input name='duration' type='checkbox' value='' />谵妄</label><br>\
  // <label><input name='duration' type='checkbox' value='' />过度镇静</label><br>\
  // <label><input name='duration' type='checkbox' value='' />皮肤瘙痒</label><br>\
  // <label><input name='duration' type='checkbox' value='' />呼吸抑制</label><br>\
  // <label><input name='duration' type='checkbox' value='' />其他</label><br>";

  //   const col6_template = "";

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
              "--          ",
              col3_template,
              col4_template,
              // col5_template,
              // col6_template,
              // col7_template,
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

  // end show
  $("body").show();
})(jQuery);
