var chai = require('chai'),
    supertest = require('supertest'),
    app = require('../js/app.js');

var commonStatusCodes = [200, 302, 400, 401, 404, 500, 502, 503];

describe('Responder', function() {
    describe('Valid Request', function() {
        commonStatusCodes.forEach(function(statusCode) {
            it('should respond ' + statusCode + ' when requested', function (done) {
                supertest(app).get('/status/' + statusCode)
                    .expect(statusCode)
                    .end(function (err, res) {
                        console.log(res.statusCode + '\n');
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
