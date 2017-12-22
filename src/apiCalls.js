const path = require('path');
require('env2')('./config.env');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const NEWS_API = process.env.NEWS_API;
const WATSON_USER = process.env.WATSON_USER.toString();
const WATSON_PASSWORD = process.env.WATSON_PASSWORD.toString();

const nlu = new NaturalLanguageUnderstandingV1({
  username: WATSON_USER,
  password: WATSON_PASSWORD,
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

let parameters = {
  'url': '',
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

const newsAPI = (searchTerm) => {
const xhr = new XMLHttpRequest();
const url =`https://newsapi.org/v2/everything?q=${searchTerm}&sources=daily-mail&apiKey=${NEWS_API}`;

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    const bodyRes = JSON.parse(this.responseText);
    parameters.url = bodyRes.articles[0].url;
    console.log(parameters.url);
    nlu.analyze(parameters, function(err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
    });
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

module.exports = newsAPI;
