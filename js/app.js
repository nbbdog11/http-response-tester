var express = require('express'),
    responder = require('./responder.js');

var app = express();

app.get('/status/:statusCode', responder.respond);
app.get('/delay/:delayInSeconds', responder.delay);

module.exports = app;