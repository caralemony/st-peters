const express = require('express');
const router = express.Router();
const home = require('./index.js');
const newsAPI = require('./apiCalls.js');
const queryString = require('query-string');

router.get('/', home.get);

router.get('/newsCall?', (req, res) => {
  const queries = queryString.parse(req.url);
  const searchTerm = queries[Object.keys(queries)[0]];
  const source = queries[Object.keys(queries)[1]];
  console.log(searchTerm, source);
  newsAPI(searchTerm, source);
})

module.exports = router;
