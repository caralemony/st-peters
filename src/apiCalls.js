require('routes');
require('env')('env2');

const newsAPI = (searchTerm) => {

const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("results").innerText = this.responseText;
    }
  };
  xhttp.open("GET", `https://newsapi.org/v2/everything?q=${searchTerm}&sources=daily-mail&apiKey=${NEWS_API}`, true);
  xhttp.send();
}
}
