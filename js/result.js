// eslint-disable-next-line no-undef
const PCNEData = getJsonSync("./assets/PCNE_data.json");
const availableDrugs = PCNEData.map((v) => v.name + v.spec);

// document ready
(function ($) {
  const col1_template = "<input class='drug-input'>";
  const col2_template =
    "<label><input name='dose' type='text' \
class='middle-input' />{0}</label>";

  const col3_template =
    "<label><input name='freq' type='radio' value='' />一天<input name='dose' type='text'\
  class='small-input'/>次</label><br>\
<label><input name='freq' type='radio' value='' />每<input name='dose' type='text'\
class='small-input'/>小时/次</label><br>\
<label><input name='freq' type='radio' value='' /><input name='dose' type='text'\
class='small-input'/>天/贴</label><br>\
<label><input name='freq' type='radio' value='' />prn（必要时）</label><br>\
<label><input name='freq' type='radio' value='' />每晚</label><br> ";

  function changeDose(node) {
    const value = $(node).val();
    const index = availableDrugs.indexOf(value);

    if (index !== -1) {
      const table = $("#recipe-table").DataTable();
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

  // recipe-table
  const table = $("#recipe-table").DataTable({
    language: table_language,
    paging: false,
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.childRowImmediate,
        type: "inline",
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
    ],

    order: [[1, "asc"]],
    info: true,

    dom: "Bfrtip",
    buttons: [
      {
        text: "增加项",
        titleAttr: "增加用药",
        action: function (e, dt, node, config) {
          console.log("add!!!");
          table.row
            .add(["", col1_template, "--          ", col3_template])
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

  $("#recipe-table tbody").on("click", "tr", function (event) {
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

  // end show
  $("body").show();
})(jQuery);
