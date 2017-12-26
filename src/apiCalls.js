const path = require('path');
require('env2')('./config.env');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const NEWS_API = process.env.NEWS_API;
const WATSON_USER = process.env.WATSON_USER.toString();
const WATSON_PASSWORD = process.env.WATSON_PASSWORD.toString();
const printResponse = require('../public/index.js');
const nlu = new NaturalLanguageUnderstandingV1({
  username: WATSON_USER,
  password: WATSON_PASSWORD,
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

let parameters = {
  'url': '',
  'features': {
    'emotion': {
    }
  }
}

const newsAPI = (searchTerm) => {
const xhr = new XMLHttpRequest();
const url =`https://newsapi.org/v2/everything?q=${searchTerm}&sources=daily-mail&apiKey=${NEWS_API}`;

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    const bodyRes = JSON.parse(this.responseText);
    parameters.url = bodyRes.articles[0].url;

    nlu.analyze(parameters, function(err, response) {
      if (err)
        console.log('error:', err);
      else
        processAPIResponse(response.emotion.document.emotion);
    });
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

const processAPIResponse = (data) => {
let keyEmotion = Object.keys(data).reduce(function(a, b){ return data[a] > data[b] ? a : b });
printResponse(keyEmotion);
}


module.exports = newsAPI;
