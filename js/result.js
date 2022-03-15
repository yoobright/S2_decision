

// document ready
(function ($) {
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

  // recipe-table
  const table = $("#recipe-table").DataTable({
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
            .add([
              "",
              col1_template,
              col2_template,
              "--          ",

            ])
            .draw(false);

          $("input.drug-input").autocomplete({
            // source: availableDrugs,
            // change: function (event, ui) {
            //   changeDose(this);
            //   // console.log($(this).val());
            // },
            // close: function (event, ui) {
            //   changeDose(this);
            // },
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
