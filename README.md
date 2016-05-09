# http-response-tester

A simple <a href="http://expressjs.com/" title="Express" target="_blank">Express</a> app that responds to a request with the HTTP status code that was requested. It can also simulate a network delay, useful for testing latency or timeout scenarios. Licensed under the MIT License.

## Usage
Install dependencies:

```bash
$ npm install
```
    
Start application:

```bash
$ node js/http-response-tester.js {config-file}
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
