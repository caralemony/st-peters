const express = require('express');
const router = express.Router();
const home = require('./index.js');
const newsAPI = require('./apiCalls.js');
const queryString = require('query-string');

router.get('/', home.get);

router.get('/newsCall?', (req, res) => {
  let queries = queryString.parse(req.url);
  let searchTerm = queries[Object.keys(queries)[0]];
  let source = queries[Object.keys(queries)[1]];
  newsAPI(searchTerm, source);
  res.redirect('/');
})

module.exports = router;
