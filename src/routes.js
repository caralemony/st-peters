const express = require('express');
const router = express.Router();
const home = require('./index.js');
const newsAPI = require('./apiCalls.js');
const updateDom = require('../src/index.js')

router.get('/', home.get);

router.get('/newsCall?', (req, res) => {
  newsAPI(req, res);
  res.redirect('/');

})

module.exports = router;
