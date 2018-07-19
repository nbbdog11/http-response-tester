const express = require('express');
const respond = require('./responder');

const sendResponse = (res, { statusCode, response }) =>
  res.status(statusCode).end(response);

const AppSetup = (configObject = {}) => {
  const app = express();

  app.get('/', (req, res) => {
    const responseOptions = {
      status: req.query.statusCode,
      delay: req.query.delay,
      responseKey: req.query.body
    };
    respond(responseOptions, configObject, response =>
      sendResponse(res, response)
    );
  });

  return app;
};

module.exports = AppSetup;
