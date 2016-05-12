var Responder = require('../js/responder.js'),
    chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    sinon = require('sinon');

describe('Responder', function() {
    var subject = new Responder();
    it('class exists', function() {
        should.exist(Responder);
    });
    
    describe('function defined', function() {
        it('statusCode', function() {
            should.exist(subject.statusCode);
        });
        it('responseBody', function() {
            should.exist(subject.responseBody);
        });
        it('delay', function() {
            should.exist(subject.delay);
        });
    });

    describe('statusCode', function() {
        var errorMessage = 'Please request a valid status code.';
        it('returns input status code', function() {
            var expectedStatusCode = 200;

            var result = subject.statusCode(expectedStatusCode);

            expect(result.statusCode).to.equal(expectedStatusCode)
        });
        
        it('handles input strings', function () {
            var expectedStatusCode = "200";

            var result = subject.statusCode(expectedStatusCode);

            expect(result.statusCode).to.equal(200);
        });
        describe('when input is null', function() {
            it('returns 400', function() {
                var result = subject.statusCode(null);

                expect(result.statusCode).to.equal(400);
            });

            it('sets proper error message', function() {
                var result = subject.statusCode(null);


                expect(result.response).to.equal(errorMessage);
            });
        });

        describe('when input is not a number', function() {
            it('returns 400', function() {
                var result = subject.statusCode("not-a-number");

                expect(result.statusCode).to.equal(400);
            });

            it('sets proper error message', function() {
                var result = subject.statusCode("not-a-number");

                expect(result.response).to.equal(errorMessage);
            });
        });
    });
    
    describe('responseBody', function() {
        describe('when key exists in config', function() {
            it('returns 200', function() {
                var config = {'some-key': 'some-value'};

                var result = subject.responseBody(config, 'some-key');

                expect(result.statusCode).to.equal(200);
            });

            it('returns configured response', function () {
                var config = {'some-key': 'some-value'};

                var result = subject.responseBody(config, 'some-key');

                expect(result.response).to.equal('some-value');
            });
        });

        describe('when config is not supplied', function() {
            it('returns error response', function() {
                var result = subject.responseBody(null);

                expect(result.response).to.equal('Required config file for responses not supplied.');
            });

            it('returns 400', function() {
                var result = subject.responseBody(null);

                expect(result.statusCode).to.equal(400);
            });
        });

        describe('when key is not in config', function() {
            it('returns error response', function() {
                var config = {'some-key': 'some-value'};

                var result = subject.responseBody(config, 'some-other-key');

                expect(result.response).to.equal('Key: some-other-key not found in supplied config.');
            });

            it('returns 400', function() {
                var config = {'some-key': 'some-value'};

                var result = subject.responseBody(config, 'some-other-key');

                expect(result.statusCode).to.equal(400);
            });
        });
    });

    describe('delay', function() {
        describe('when request is valid', function() {
            beforeEach(function () {
                this.clock = sinon.useFakeTimers();
            });
            afterEach(function () {
                this.clock.restore();
            });

            it('calls callback after timeout', function() {
                var callback = sinon.spy();

                subject.delay(1, callback);

                this.clock.tick(999);
                expect(callback.called).to.be.false;
                this.clock.tick(1);
                expect(callback.called).to.be.true;
            })
        });

        describe('when parameter is not a number', function() {
            it('returns 400', function() {
                var result = subject.delay('not-a-number');

                expect(result.statusCode).to.equal(400);
            });

            it('returns error message', function () {
                var result = subject.delay('not-a-number');

                expect(result.response).to.equal('Invalid value for delay: not-a-number');
            })
        });
    });
});