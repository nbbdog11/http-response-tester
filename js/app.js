const express = require('express');
const { statusCode, delay, responseBody } = require('./responder.js');

const sendResponse = (res, response) =>
  res.status(response.statusCode).end(response.response);

const AppSetup = (configObject = {}) => {
  const app = express();

  app.get('/', (req, res) => {
    if (req.query.statusCode) {
      const response = statusCode(req.query.statusCode);
      sendResponse(res, response);
    } else if (req.query.delay) {
      const response = delay(req.query.delay, res.end.bind(res));
      if (response) {
        sendResponse(res, response);
      }
    }
  });

  app.get('/body/:configKey', (req, res) => {
    const response = responseBody(configObject, req.params.configKey);
    sendResponse(res, response);
  });

  return app;
};

module.exports = AppSetup;
