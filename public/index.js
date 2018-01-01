var results = document.getElementById("results");
var btn = document.getElementById("submit");
var form = document.getElementById("form");
var search = document.getElementById("searchTerm");
var op = document.getElementById("options");
var spinner = document.getElementById("spinner");

form.addEventListener("submit", function(event) {
  event.preventDefault();
    var searchTerm = search.value;
    var url = "/newsCall?" + searchTerm + "&" + op.options[op.selectedIndex].value;
    spinner.className = "loader";
    XHRrequest(url, updateDom);
    });


function updateDom(data) {
  data = JSON.parse(data);
  var emotion = Object.keys(data).reduce(function(a, b) {
    return data[a] > data[b] ? a : b
  });
  spinner.className = "hidden";
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
