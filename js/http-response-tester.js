/* eslint-disable no-console */
const AppSetup = require('./app.js');
const config = require('./config.js');

const buildConfigObject = () => {
  const configPath = process.argv.slice(2)[0];
  const configSpecified = configPath && configPath.length > 0;
  return configSpecified ? config.loadFromFile(configPath) : {};
};

const { app } = new AppSetup(buildConfigObject());

const server = app.listen(process.env.PORT || 3000, () => {
  const address = server.address();
  const {
    host,
    port,
  } = address;
  console.log('http-response-tester listening at http://%s:%s', host, port);
});
