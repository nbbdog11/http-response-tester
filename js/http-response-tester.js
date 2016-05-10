var AppSetup = require('./app.js'),
    config = require('./config.js');


function buildConfigObject() {
    var configPath = process.argv.slice(2)[0];
    var configSpecified = configPath && configPath.length > 0;
    return configSpecified ? config.loadFromFile(configPath) : {};
}

var app = new AppSetup(buildConfigObject()).app;

var server = app.listen(process.env.PORT || 3000, function() {
    var address = server.address(),
        host = address.address,
        port = address.port;
    console.log('http-response-tester listening at http://%s:%s', host, port);
});