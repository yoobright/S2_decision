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
    return this.replace(/(\d+)/gu, (match, number) => {
      return typeof args[number] !== undefined ? args[number] : match;
    });
  };
}

jQuery.fn.dataTable.Api.register( "responsive.redisplay()", function () {
  var responsive = this.context[0].responsive;

  if (responsive) {
    responsive._redrawChildren();
  }
} );


