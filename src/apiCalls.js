const path = require('path');
require('env2')('./config.env');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('./routes');
const NEWS_API = process.env.NEWS_API;
const results = require('../public/index.js');

const watsonCall = (articleUrl) => {
  console.log(articleUrl);
}


const newsAPI = (searchTerm) => {
const xhr = new XMLHttpRequest();
const url =`https://newsapi.org/v2/everything?q=${searchTerm}&sources=daily-mail&apiKey=${NEWS_API}`;

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    const bodyRes = JSON.parse(this.responseText);
    const articleUrl = bodyRes.articles[0].url;
    results.innerText = articleUrl;
    watsonCall(articleUrl);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

module.exports = newsAPI;
