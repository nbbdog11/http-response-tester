var app = require('./app.js'),
    config = require('./config.js');

var server = app.listen(process.env.PORT || 3000, function() {
    var address = server.address(),
        host = address.address,
        port = address.port,
        configPath = process.argv.slice(2)[0];

    var configSpecified = configPath && configPath.length > 0;
    var configObject = configSpecified ? config.loadFromFile(configPath) : {};
    app.loadConfig(configObject);
    console.log('http-response-tester listening at http://%s:%s', host, port);
});