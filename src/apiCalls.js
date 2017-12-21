const path = require('path');
require('env2')('./config.env');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const NEWS_API = process.env.NEWS_API;
const WATSON_USER = process.env.WATSON_USER;
const WATSON_PASSWORD = process.env.WATSON_PASSWORD;

var nlu = new NaturalLanguageUnderstandingV1({
  username: WATSON_USER,
  password: WATSON_PASSWORD,
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

var parameters = {
  'url': articleUrl,
  'features': {
    'entities': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    },
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    }
  }
}

nlu.analyze(parameters, function(err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});

const newsAPI = (searchTerm, res) => {
const xhr = new XMLHttpRequest();
const url =`https://newsapi.org/v2/everything?q=${searchTerm}&sources=daily-mail&apiKey=${NEWS_API}`;

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    const bodyRes = JSON.parse(this.responseText);
    const articleUrl = bodyRes.articles[0].url;
    nlu(articleUrl);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

module.exports = newsAPI;
