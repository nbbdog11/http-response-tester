var express = require('express'),
    responder = require('./responder.js'),
    config = require('./config.js');

var app = express();

app.get('/status/:statusCode', responder.respond);
app.get('/delay/:delayInSeconds', responder.delay);
app.get('/body/:configKey', responder.responseBody);

app.loadConfig = function (configObject) {
    responder.loadConfig(configObject);
};

module.exports = app;
