const express = require('express');
const respond = require('./responder.js');

const sendResponse = (res, response) =>
  res.status(response.statusCode).end(response.response);

const AppSetup = (configObject = {}) => {
  const app = express();

  app.get('/', (req, res) => {
    if (req.query.statusCode) {
      const response = respond({ status: req.query.statusCode });
      sendResponse(res, response);
    } else if (req.query.delay) {
      const response = respond(
        { delay: req.query.delay },
        {},
        res.end.bind(res)
      );
      if (response) {
        sendResponse(res, response);
      }
    } else if (req.query.body) {
      const response = respond({ responseKey: req.query.body }, configObject);
      sendResponse(res, response);
    }
  });

  return app;
};

module.exports = AppSetup;
