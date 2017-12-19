const path = require('path');
const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(routes);
module.exports = app;
