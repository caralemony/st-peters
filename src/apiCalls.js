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

  APIrequest(url, (error, res, body) => {
    if (error) {
      console.log('error:', error);
    } else {
      let results = JSON.parse(body);
      parameters.url = results.articles[0].url;

const sendResults = (emotions) => {
  response.end(JSON.stringify(emotions));
}
        nlu.analyze(parameters, function(err, response) {
          if (err)
            sendResults('Sorry, there is a problem our AI');
            else {
              let emotions = response.emotion.document.emotion;
              sendResults(emotions);
              }
            }, sendResults);

    }
  });
};






module.exports = newsAPI;
