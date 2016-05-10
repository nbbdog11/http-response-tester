var express = require('express'),
    Responder = require('./responder.js'),
    responder = new Responder(),
    config = require('./config.js');

var app = express();

app.get('/status/:statusCode', function(req, res) {
    var response = responder.statusCode(req.params.statusCode);
    res.status(response.statusCode).end(response.response);
});
app.get('/delay/:delayInSeconds', responder.delay);
app.get('/body/:configKey', function(req, res) {
    var response = responder.responseBody(app.configObject, req.params.configKey);
    res.status(response.statusCode).end(response.response);
});

app.loadConfig = function (configObject) {
    app.configObject = configObject;
};

module.exports = app;