var express = require('express'),
    respond = require('./responder.js').respond;

var app = express();

app.get('/:statusCode', respond);

module.exports = app;