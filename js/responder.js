var Response = require('./Response.js');

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

Responder.prototype.delay = function (delayInSeconds, callback) {
    if (isNaN(delayInSeconds)) {
        return new Response(400, 'Invalid value for delay: ' + delayInSeconds);
    }
    setTimeout(callback, delayInSeconds * 1000);
};

module.exports = Responder;
