const express = require('express');
const router = express.Router();
const home = require('./index');

router.get('/', home.get);

router.get('/newsCall?', (req, res) => {
  const url = req.url;
  const searchTerm = url.split('=')[1];
  console.log(searchTerm);
})

module.exports = router;
