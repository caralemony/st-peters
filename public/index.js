var results = document.getElementById("results");
var btn = document.getElementById("submit");
var form = document.getElementById("form");
var search = document.getElementById("searchTerm");
var op = document.getElementById("options");

form.addEventListener("submit", function APICall(searchTerm, source) {
    // if (err) {
    //     console.log(err)
    // } else {
    var searchTerm = search.value;
        var url = "/newsCall?" + searchTerm + "&" + op.options[op.selectedIndex].value;
        console.log('search=', searchTerm, 'url=', url);
      XHRrequest(url, updateDom);
      });


function updateDom(err, data) {
  console.log('here');
}

function XHRrequest(url, cb) {
  var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                cb(null, 'SOMETHING');
            } else {
                var errorMessage = 'KLJNEFKJ';
                cb("Error " + url + " " + errorMessage);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}
