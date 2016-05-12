var express = require('express'),
    Responder = require('./responder.js'),
    responder = new Responder();

function AppSetup(configObject) {
    configObject = configObject || {};
    this.app = express();

    this.app.get('/status/:statusCode', function(req, res) {
        var response = responder.statusCode(req.params.statusCode);
        sendResponse(res, response);
    });
    function sendResponse(res, response) {
        res.status(response.statusCode).end(response.response);
    }

    this.app.get('/delay/:delayInSeconds', function (req, res) {
        var delayInSeconds = req.params.delayInSeconds;
        var response = responder.delay(delayInSeconds, res.end.bind(res));
        if (response) {
            sendResponse(res, response);
        }
    });
    this.app.get('/body/:configKey', function(req, res) {
        var response = responder.responseBody(configObject, req.params.configKey);
        sendResponse(res, response);
    });
}

module.exports = AppSetup;