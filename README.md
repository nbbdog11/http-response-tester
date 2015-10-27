# http-response-tester

A simple [Express](http://expressjs.com/ "Express") app that responds to a request with the HTTP status code that was requested.

## Usage
Install dependencies:
    npm install
    
Start application:
    node js/http-response-tester.js
    
Send a request to the express server:
    http://localhost:3000/status/{statusCode}