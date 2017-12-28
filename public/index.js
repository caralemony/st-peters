var results = document.getElementById('results');


xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

};
xhr.open("GET", '/newsCall', true);
xhr.send();
};
