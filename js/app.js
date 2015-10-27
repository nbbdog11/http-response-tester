var express = require('express');

var app = express();

app.get('/:statusCode', function(req, res) {
    var statusCode = req.params.statusCode;
    if (isNaN(statusCode)) {
        res.status(400).end('Please request a valid status code.')
    } else {
        res.sendStatus(parseInt(statusCode));
    }
});

module.exports = app;

