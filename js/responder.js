var responder = {
    respond: function(req, res) {
        var statusCode = req.params.statusCode;
        if (isNaN(statusCode)) {
            res.status(400).end('Please request a valid status code.')
        } else {
            res.sendStatus(parseInt(statusCode));
        }
    }
};

module.exports = responder;