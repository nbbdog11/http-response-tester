var config = {};
var responder = {
    respond: function(req, res) {
        var statusCode = req.params.statusCode;
        if (isNaN(statusCode)) {
            res.status(400).end('Please request a valid status code.');
        } else {
            res.sendStatus(parseInt(statusCode));
        }
    },
    delay: function(req, res) {
        var delayInSeconds = req.params.delayInSeconds;
        if (isNaN(delayInSeconds)) {
            res.status(400).end('Please request a valid delay time.');
        } else {
            setTimeout(function() {
                res.end();
            }, delayInSeconds * 1000);
        }
    },
    responseBody: function(req, res) {
        var configKey = req.params.configKey;
        if (!config) {
            res.status(400).end('Required config file for responses not supplied.');
        }
        else {
            var configuredResponse = config[configKey];
            if(!configuredResponse)
            {
                res.status(400).end('Key: ' + configKey + ' not found in supplied config.');
            }
            res.end(configuredResponse);
        }
    },
    loadConfig: function(configObject) {
        config = configObject;
    }
};

module.exports = responder;
