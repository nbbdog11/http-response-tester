const supertest = require('supertest');
const AppSetup = require('../js/app');

let app = null;

const commonStatusCodes = [200, 302, 400, 401, 404, 500, 502, 503];

describe('http-response-tester', () => {
  beforeEach(() => {
    app = AppSetup();
  });
  describe('Status Codes', () => {
    describe('Valid Request', () => {
      commonStatusCodes.forEach(statusCode => {
        it(`should respond ${statusCode} when requested`, done => {
          supertest(app)
            .get(`?statusCode=${statusCode}`)
            .expect(statusCode)
            .end(err => {
              done(err);
            });
        });
      });
    });

    describe('Invalid Request', () => {
      it('should respond 400 when an invalid request is made', done => {
        supertest(app)
          .get('?statusCode=invalidRequest')
          .expect(400)
          .end(err => {
            done(err);
          });
      });
    });
  });
  describe('Response Delay', () => {
    describe('Valid Request', () => {
      it('should respond in the amount of time requested', done => {
        const timeDelayInSeconds = 1;
        const start = new Date().getTime();
        supertest(app)
          .get(`?delay=${timeDelayInSeconds}`)
          .expect(200)
          .end(err => {
            if (err) {
              done(err);
            }
            const end = new Date().getTime();
            const timeElapsed = end - start;
            if (timeElapsed < timeDelayInSeconds * 1000) {
              done(
                new Error(
                  `Response was not delayed for full length. Expected Delay: ${timeDelayInSeconds}, Actual Delay: ${timeElapsed /
                    1000}`
                )
              );
            } else {
              done();
            }
          });
      });
    });

    describe('Invalid Request', () => {
      it('should respond 400 when an invalid request is made', done => {
        supertest(app)
          .get('?delay=invalidRequest')
          .expect(400)
          .end(err => {
            done(err);
          });
      });
    });
  });

  describe('Response Body', () => {
    describe('should 400', () => {
      it('when config not supplied', done => {
        app = AppSetup(null);
        const someKey = 'some-key';
        supertest(app)
          .get(`?body=${someKey}`)
          .expect(400)
          .end(err => {
            done(err);
          });
      });
      it('when key does not exist in config', done => {
        const keyNotInConfig = 'key-not-in-config';
        supertest(app)
          .get(`?body=${keyNotInConfig}`)
          .expect(400)
          .end(err => {
            done(err);
          });
      });
    });
    it('should return response when it exists in config', done => {
      const value = 'value';
      app = AppSetup({ key: value });
      supertest(app)
        .get('?body=key')
        .expect(200, value)
        .end(err => {
          done(err);
        });
    });
  });
});
