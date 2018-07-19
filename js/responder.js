const Response = require('./Response.js');

const isValidNumber = numberString => {
  const number = parseInt(numberString, 10);
  return !Number.isNaN(number);
};

const statusCode = code => {
  const validRequest = code && isValidNumber(code);
  const statusCodeValue = validRequest ? parseInt(code, 10) : 400;
  const response = validRequest ? '' : 'Please request a valid status code.';
  return new Response(statusCodeValue, response);
};

const responseBody = (key, config) => {
  if (!config) {
    return new Response(400, 'Required config for responses not supplied.');
  }
  const configuredResponse = config[key];
  if (!configuredResponse) {
    return new Response(400, `Key: '${key}' not found in supplied config.`);
  }
  return new Response(200, configuredResponse);
};

/* eslint-disable consistent-return */
const delay = (delayInSeconds, callback) => {
  if (!isValidNumber(delayInSeconds)) {
    return new Response(400, `Invalid value for delay: ${delayInSeconds}`);
  }
  setTimeout(callback, delayInSeconds * 1000);
};
/* eslint-enable consistent-return */

const respond = (responseOptions, appConfig, callback) => {
  if (responseOptions.responseKey) {
    return responseBody(responseOptions.responseKey, appConfig);
  }

  if (responseOptions.delay) {
    return delay(responseOptions.delay, callback);
  }

  return statusCode(responseOptions.status);
};

module.exports = respond;
