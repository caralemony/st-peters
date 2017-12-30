var results = document.getElementById("results");
var btn = document.getElementById("submit");
var form = document.getElementById("form");
var search = document.getElementById("searchTerm");
var op = document.getElementById("options");

var emotion = "";

form.addEventListener("submit", function(event) {
  event.preventDefault();
    var searchTerm = search.value;
    var url = "/newsCall?" + searchTerm + "&" + op.options[op.selectedIndex].value;
    XHRrequest(url, updateDom);
    });


function updateDom(data) {
  emotion = data;
  results.innerText = emotion;
}

function XHRrequest(url, cb) {
  var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              cb(xhr.responseText);
            } else {
                var errorMessage = 'Something went wrong with our lookup';
                cb("Error " + url + " " + errorMessage);
            }
    }
  };
    xhr.open("GET", url, true);
    xhr.send();
}
