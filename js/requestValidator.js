const isValidNumber = numberString => {
  if (numberString === null) {
    return false;
  }

  const number = parseInt(numberString, 10);
  return !Number.isNaN(number);
};

const validateStatusCode = code => {
  if (typeof code === 'undefined') {
    return [];
  }
  return isValidNumber(code) ? [] : ['Please request a valid status code.'];
};

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

module.exports = validateRequest;
