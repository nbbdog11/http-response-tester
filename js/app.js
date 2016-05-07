var express = require('express'),
    responder = require('./responder.js');

var app = express();

app.get('/status/:statusCode', responder.respond);
app.get('/delay/:delayInSeconds', responder.delay);
app.get('/body/:responseBody', responder.responseBody);

module.exports = app;
