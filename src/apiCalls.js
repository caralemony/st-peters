const request = require('request');
require('env2')('./config.env');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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
    'emotion': {
    }
  }
}
const newsAPI = (searchTerm, source) => {
const url =`https://newsapi.org/v2/everything?q=${searchTerm}&sources=${source}&apiKey=${NEWS_API}`;

request(url, function (error, response, body) {
  if (error) {
  console.log('error:', error);
} else if (response.statusCode == 200) {
  let results = JSON.parse(body);
  parameters.url = results.articles[0].url
  console.log(parameters.url);
      nlu.analyze(parameters, function(err, response) {
        if (err)
          console.log('error:', err);
        else
          processAPIResponse(response.emotion.document.emotion);
      });
} else {
  console.log('uh oh');
}
});
};




const processAPIResponse = (data) => {
let keyEmotion = Object.keys(data).reduce(function(a, b){ return data[a] > data[b] ? a : b });
console.log(keyEmotion);
}



module.exports = newsAPI;
