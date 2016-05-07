var chai = require('chai'),
    supertest = require('supertest'),
    app = require('../js/app.js');

var commonStatusCodes = [200, 302, 400, 401, 404, 500, 502, 503];

describe('Responder', function() {
    describe('Status Codes', function() {
        describe('Valid Request', function() {
            commonStatusCodes.forEach(function(statusCode) {
                it('should respond ' + statusCode + ' when requested', function(done) {
                    supertest(app).get('/status/' + statusCode)
                        .expect(statusCode)
                        .end(function (err) {
                            done(err);
                        });
                });
            });
        });

        describe('Invalid Request', function() {
            it('should respond 400 when an invalid request is made', function(done) {
                supertest(app).get('/status/invalidRequest')
                    .expect(400)
                    .end(function(err) {
                        done(err);
                    })
            });
        });
    });
    describe('Response Delay', function() {
        describe('Valid Request', function() {
           it('should respond in the amount of time requested', function(done) {
               var timeDelayInSeconds = 5;
               this.timeout((timeDelayInSeconds + 1) * 1000);
               var start = new Date().getTime();
               supertest(app).get('/delay/' + timeDelayInSeconds)
                   .expect(200)
                   .end(function(err) {
                       if(err) {
                           done(err);
                       }
                       var end = new Date().getTime();
                       var timeElapsed = end - start;
                       if(timeElapsed < (timeDelayInSeconds * 1000)) {
                           done(new Error('Response was not delayed for full length. Expected Delay: ' +
                               timeDelayInSeconds + ", Actual Delay: " + (timeElapsed/1000))
                           );
                       } else {
                           done();
                       }
                   });
           });
        });

        describe('Invalid Request', function() {
            it('should respond 400 when an invalid request is made', function(done) {
                supertest(app).get('/delay/invalidRequest')
                    .expect(400)
                    .end(function(err) {
                        done(err);
                    })
            });
        });
    });
});
