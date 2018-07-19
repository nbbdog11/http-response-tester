const validateRequest = require('./requestValidator');

const getStatusCode = (code = 200) => parseInt(code, 10);

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

const respond = (responseOptions, appConfig, callback) => {
  const validationErrors = validateRequest(responseOptions, appConfig);
  if (validationErrors && validationErrors.length > 0) {
    const errorResponse = {
      status: 400,
      response: validationErrors.join('\n')
    };
    callback(errorResponse);
  }

  const responseBody = getResponseBody(responseOptions.responseKey, appConfig);
  const statusCode = getStatusCode(responseOptions.status);
  const response = {
    status: statusCode,
    response: responseBody
  };
  delay(responseOptions.delay, () => callback(response));
};

module.exports = respond;
