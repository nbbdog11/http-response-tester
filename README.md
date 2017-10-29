# http-response-tester

[![Build Status](https://travis-ci.org/nbbdog11/http-response-tester.svg?branch=master)](https://travis-ci.org/nbbdog11/http-response-tester)

A simple <a href="http://expressjs.com/" title="Express" target="_blank">Express</a> app that can respond in various ways useful for testing. It can return a particular status code, it can simulate a network delay (useful for testing latency or timeout scenarios), and it can respond with a pre-configured response body. Licensed under the MIT License.

## Usage
Install dependencies:

```bash
$ npm install
```

or

```bash
$ yarn
```

Start application:

```bash
$ npm start
```
If supplying a config file for pre-configured response values, use:

```bash
$ npm start -- {configFileLocation}
```

Send a request to the express server:

```bash
$ curl -I http://localhost:3000/status/{statusCode}
```

or

```bash
$ curl -I http://localhost:3000/delay/{delayInSeconds}
```

You can now supply a file with configured responses for a given key. The config file should be in standard JSON.
To use this feature, send a request like the one below:
```bash
$ curl -I http://localhost:3000/body/{key}
```
When 'key' is a key defined in the config file, the response will be the object defined in the config file for the given key.
## Motivation
I decided to develop this little utility because I needed a way to test how an HTTP client would behave with various
possible responses.
