# http-response-tester

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

Send a request to the express server:

```bash
$ curl -I http://localhost:3000?statusCode={statusCode}
```

or

```bash
$ curl -I http://localhost:3000?delay={delayInSeconds}
```

Requests can also be composed by supplying multiple query params. Ex:
```bash
$ curl -I http://localhost:3000?delay={delayInSeconds}&statusCode={statusCode}
```


You can now supply configured responses for a given key. The configured responses will be read from an environment variable called `HTTP_RESPONSE_TESTER_RESPONSES`. They should be formatted standard JSON.
To use this feature, send a request like the one below:
```bash
$ curl -I http://localhost:3000?body={key}
```
When 'key' is a key defined in the JSON environment variable, the response will be the value defined in the config for the given key.
## Motivation
I decided to develop this little utility because I needed a way to test how an HTTP client would behave with various
possible responses.
