const Response = require('./Response');

const isValidNumber = numberString => {
  if (numberString === null) {
    return false;
  }

  const number = parseInt(numberString, 10);
  return !Number.isNaN(number);
};

const getStatusCode = (code = 200) => parseInt(code, 10);

const validateResponseBody = (key, config) => {
  if (typeof key === 'undefined') {
    return [];
  }
  if (!config) {
    return ['Required config for responses not supplied.'];
  }
  const configuredResponse = config[key];
  if (!configuredResponse) {
    return [`Key: '${key}' not found in supplied config.`];
  }

  return [];
};

const getResponseBody = (key, config) => (key && config ? config[key] : '');

/* eslint-disable consistent-return */
const delay = (delayInSeconds = 0, callback) => {
  if (delayInSeconds === 0) {
    callback();
  } else {
    setTimeout(callback, delayInSeconds * 1000);
  }
};
/* eslint-enable consistent-return */

const validateStatusCode = code => {
  if (typeof code === 'undefined') {
    return [];
  }
  return isValidNumber(code) ? [] : ['Please request a valid status code.'];
};

const validateDelay = delayInSeconds => {
  if (typeof delayInSeconds === 'undefined') {
    return [];
  }
  return isValidNumber(delayInSeconds)
    ? []
    : [`Invalid value for delay: ${delayInSeconds}`];
};

const validateRequest = (responseOptions, appConfig) => [
  ...validateStatusCode(responseOptions.status),
  ...validateResponseBody(responseOptions.responseKey, appConfig),
  ...validateDelay(responseOptions.delay)
];

const respond = (responseOptions, appConfig, callback) => {
  const validationErrors = validateRequest(responseOptions, appConfig);
  if (validationErrors && validationErrors.length > 0) {
    const errorResponse = new Response(400, validationErrors.join('\n'));
    callback(errorResponse);
  }

  const responseBody = getResponseBody(responseOptions.responseKey, appConfig);
  const statusCode = getStatusCode(responseOptions.status);
  const response = new Response(statusCode, responseBody);
  delay(responseOptions.delay, () => callback(response));
};

module.exports = respond;
