const APIrequest = require('request');
require('env2')('./config.env');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const NEWS_API = process.env.NEWS_API;
const WATSON_USER = process.env.WATSON_USER.toString();
const WATSON_PASSWORD = process.env.WATSON_PASSWORD.toString();
const router = require('./routes');

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



const newsAPI = (request, response) => {
  let searchTerm = request.url.split('?')[1].split('&')[0];
  let source = request.url.split('&')[1];
  let url = `https://newsapi.org/v2/everything?q=${searchTerm}&sources=${source}&apiKey=${NEWS_API}`;
  console.log(url);



  APIrequest(url, (error, res, body) => {
    let emotions = [];
    if (error) {
      console.log('error:', error);

    } else {
      let results = JSON.parse(body);
      parameters.url = results.articles[0].url;
      nlu.analyze(parameters, function(err, response) {
        if (err)
          console.log('error:', err);
        else {
        let emotions = response.emotion.document.emotion;
          // let emotion = Object.keys(results).reduce(function(a, b) {
          //   return results[a] > results[b] ? a : b
          // });
        }
      });
        response.end(JSON.stringify(parameters.url));
    }
  });
};






module.exports = newsAPI;
