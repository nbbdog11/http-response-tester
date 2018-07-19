/* eslint-disable no-console */
const http = require('http');
const AppSetup = require('./app');

const tryParseConfiguredResponse = configuredResponseString => {
  try {
    return JSON.parse(configuredResponseString);
  } catch (e) {
    console.error(
      'Error parsing responses configuration from environment variable.'
    );
    console.error(`Received ${configuredResponseString}`);
    console.error('App will start without configured responses.');
    console.error(e);
    return {};
  }
};

const buildConfigObject = () => {
  const configuredResponseString = process.env.HTTP_RESPONSE_TESTER_RESPONSES;
  const configSpecified =
    configuredResponseString && configuredResponseString.length > 0;
  if (configSpecified) {
    return tryParseConfiguredResponse(configuredResponseString);
  }

  return {};
};

const app = AppSetup(buildConfigObject());

http.createServer(app).listen(3000, err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('http-response-tester listening on port 3000');
});
