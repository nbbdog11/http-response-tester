const express = require('express');
const { statusCode, delay, responseBody } = require('./responder.js');

const sendResponse = (res, response) =>
  res.status(response.statusCode).end(response.response);

const AppSetup = (configObject = {}) => {
  const app = express();

  app.get('/status/:statusCode', (req, res) => {
    const response = statusCode(req.params.statusCode);
    sendResponse(res, response);
  });

  app.get('/delay/:delayInSeconds', (req, res) => {
    const { delayInSeconds } = req.params;
    const response = delay(delayInSeconds, res.end.bind(res));
    if (response) {
      sendResponse(res, response);
    }
  });
  app.get('/body/:configKey', (req, res) => {
    const response = responseBody(configObject, req.params.configKey);
    sendResponse(res, response);
  });

  return app;
};

module.exports = AppSetup;
