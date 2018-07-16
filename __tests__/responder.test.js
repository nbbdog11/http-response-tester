/* eslint-disable no-unused-expressions */
const { statusCode, responseBody, delay } = require('../js/responder.js');
const chai = require('chai');

const should = chai.should();
const { expect } = chai;
const sinon = require('sinon');

describe('Responder', () => {
  describe('function defined', () => {
    it('statusCode', () => {
      should.exist(statusCode);
    });
    it('responseBody', () => {
      should.exist(responseBody);
    });
    it('delay', () => {
      should.exist(delay);
    });
  });

  describe('statusCode', () => {
    const errorMessage = 'Please request a valid status code.';
    it('returns input status code', () => {
      const expectedStatusCode = 200;

      const result = statusCode(expectedStatusCode);

      expect(result.statusCode).to.equal(expectedStatusCode);
    });

    it('handles input strings', () => {
      const expectedStatusCode = '200';

      const result = statusCode(expectedStatusCode);

      expect(result.statusCode).to.equal(200);
    });
    describe('when input is null', () => {
      it('returns 400', () => {
        const result = statusCode(null);

        expect(result.statusCode).to.equal(400);
      });

      it('sets proper error message', () => {
        const result = statusCode(null);

        expect(result.response).to.equal(errorMessage);
      });
    });

    describe('when input is not a number', () => {
      it('returns 400', () => {
        const result = statusCode('not-a-number');

        expect(result.statusCode).to.equal(400);
      });

      it('sets proper error message', () => {
        const result = statusCode('not-a-number');

        expect(result.response).to.equal(errorMessage);
      });
    });
  });

  describe('responseBody', () => {
    describe('when key exists in config', () => {
      it('returns 200', () => {
        const config = { 'some-key': 'some-value' };

        const result = responseBody(config, 'some-key');

        expect(result.statusCode).to.equal(200);
      });

      it('returns configured response', () => {
        const config = { 'some-key': 'some-value' };

        const result = responseBody(config, 'some-key');

        expect(result.response).to.equal('some-value');
      });
    });

    describe('when config is not supplied', () => {
      it('returns error response', () => {
        const result = responseBody(null);

        expect(result.response).to.equal(
          'Required config file for responses not supplied.'
        );
      });

      it('returns 400', () => {
        const result = responseBody(null);

        expect(result.statusCode).to.equal(400);
      });
    });

    describe('when key is not in config', () => {
      it('returns error response', () => {
        const config = { 'some-key': 'some-value' };

        const result = responseBody(config, 'some-other-key');

        expect(result.response).to.equal(
          'Key: some-other-key not found in supplied config.'
        );
      });

      it('returns 400', () => {
        const config = { 'some-key': 'some-value' };

        const result = responseBody(config, 'some-other-key');

        expect(result.statusCode).to.equal(400);
      });
    });
  });

  describe('delay', () => {
    describe('when request is valid', () => {
      beforeAll(() => {
        jest.useFakeTimers();
      });
      beforeEach(() => {
        jest.clearAllTimers();
      });

      it('calls callback after timeout', () => {
        const callback = sinon.spy();

        delay(1, callback);

        jest.advanceTimersByTime(999);
        expect(callback.called).to.be.false;
        jest.advanceTimersByTime(1);
        expect(callback.called).to.be.true;
      });
    });

    describe('when parameter is not a number', () => {
      it('returns 400', () => {
        const result = delay('not-a-number');

        expect(result.statusCode).to.equal(400);
      });

      it('returns error message', () => {
        const result = delay('not-a-number');

        expect(result.response).to.equal(
          'Invalid value for delay: not-a-number'
        );
      });
    });
  });
});
