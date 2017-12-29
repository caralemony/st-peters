const express = require('express');
const router = express.Router();
const home = require('./index.js');
const newsAPI = require('./apiCalls.js');

router.get('/', home.get);

router.get('/newsCall?', (req, res) => {
  let searchTerm = req.url.split('?')[1].split('&')[0];
  let source = req.url.split('&')[1];
  newsAPI(searchTerm, source);
  res.redirect('/');

})

module.exports = router;
