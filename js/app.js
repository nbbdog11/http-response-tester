var express = require('express'),
    Responder = require('./responder.js'),
    responder = new Responder();

function AppSetup(configObject) {
    configObject = configObject || {};
    this.app = express();

    this.app.get('/status/:statusCode', function(req, res) {
        var response = responder.statusCode(req.params.statusCode);
        res.status(response.statusCode).end(response.response);
    });
    this.app.get('/delay/:delayInSeconds', responder.delay);
    this.app.get('/body/:configKey', function(req, res) {
        var response = responder.responseBody(configObject, req.params.configKey);
        res.status(response.statusCode).end(response.response);
    });
}

module.exports = AppSetup;