/* eslint-disable no-console */
const AppSetup = require('./app.js');
const config = require('./config.js');
const http = require('http');

const buildConfigObject = () => {
  const configPath = process.argv.slice(2)[0];
  const configSpecified = configPath && configPath.length > 0;
  return configSpecified ? config.loadFromFile(configPath) : {};
};

const app = AppSetup(buildConfigObject());

const port = process.env.PORT || 3000;

http.createServer(app).listen(port, err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`http-response-tester listening on port ${port}`);
});
