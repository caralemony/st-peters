var results = document.getElementById("results");
var btn = document.getElementById("submit");
var form = document.getElementById("form");
var search = document.getElementById("searchTerm");
var op = document.getElementById("options");

form.addEventListener("submit", function APICall(searchTerm, source) {
    var searchTerm = search.value;
    var url = "/newsCall?" + searchTerm + "&" + op.options[op.selectedIndex].value;
    console.log(url);
    XHRrequest(url, updateDom);
    });


function updateDom(data) {
  results.innerText = data;
}

function XHRrequest(url, cb) {
  console.log('req', url);
  var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var responseObj = JSON.parse(xhr.responseText);
              cb(responseObj);
            } else {
                var errorMessage = 'KLJNEFKJ';
                cb("Error " + url + " " + errorMessage);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}
