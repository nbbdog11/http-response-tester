var Response = require('./response.js');

function Responder () {}

Responder.prototype.statusCode = function(code) {
    var validRequest = code && !isNaN(code);
    var statusCode = validRequest ? parseInt(code) : 400;
    var response = validRequest ? '' : 'Please request a valid status code.';
    return new Response(statusCode, response);
};

Responder.prototype.responseBody = function(config, key) {
    if(!config) {
        return new Response(400, 'Required config file for responses not supplied.');
    }
    var configuredResponse = config[key];
    if(!configuredResponse) {
        return new Response(400, 'Key: ' + key + ' not found in supplied config.');
    }
    return new Response(200, configuredResponse);
};

Responder.prototype.delay = function(req, res) {
    var delayInSeconds = req.params.delayInSeconds;
    if (isNaN(delayInSeconds)) {
        res.status(400).end('Please request a valid delay time.');
    } else {
        setTimeout(function() {
            res.end();
        }, delayInSeconds * 1000);
    }
};

module.exports = Responder;