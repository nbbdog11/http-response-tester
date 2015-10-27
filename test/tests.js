var chai = require('chai');
var supertest = require('supertest');
var app = require('../js/app.js');

describe('Responder', function() {
    describe('Valid Request', function() {
        it('should respond 200 when requested', function(done) {
            supertest(app).get('/200')
                .expect(200)
                .end(function (err) {
                    done(err);
                });
        });

        it('should respond 400 when an invalid request is made', function(done) {
            supertest(app).get('/invalidRequest')
                .expect(400)
                .end(function(err) {
                    done(err);
                })
        });
    });
});
