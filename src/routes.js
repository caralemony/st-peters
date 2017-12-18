const express = require('express');
const router = express.Router();
const home = require('./index');

router.get('/', home.get);
