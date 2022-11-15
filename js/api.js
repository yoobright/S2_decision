const pds_server = "http://localhost:8089";

// jquery get hello data
function getHello() {
  $.get(pds_server + "/", (data, status) => {
    console.log("Data: " + data + " Status: " + status);
  });
}
