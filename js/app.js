var express = require('express'),
    respond = require('./responder.js').respond;

var app = express();

app.get('/status/:statusCode', respond);

module.exports = app;