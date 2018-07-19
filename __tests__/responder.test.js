/* eslint-disable no-unused-expressions */
const respond = require('../js/responder.js');

describe('Responder', () => {
  describe('respond', () => {
    const errorMessage = 'Please request a valid status code.';
    it('returns input status code', () => {
      const expectedStatusCode = 200;

      const result = respond({ status: expectedStatusCode });

      expect(result.statusCode).toEqual(expectedStatusCode);
    });

    it('handles input strings', () => {
      const expectedStatusCode = '200';

      const result = respond({ status: expectedStatusCode });

      expect(result.statusCode).toEqual(200);
    });

    describe('when input is null', () => {
      it('returns 400', () => {
        const result = respond({ status: null });

        expect(result.statusCode).toEqual(400);
      });

      it('sets proper error message', () => {
        const result = respond({ status: null });

        expect(result.response).toEqual(errorMessage);
      });
    });

    describe('when input is not a number', () => {
      it('returns 400', () => {
        const result = respond({ status: 'not-a-number' });

        expect(result.statusCode).toEqual(400);
      });

      it('sets proper error message', () => {
        const result = respond({ status: 'not-a-number' });

        expect(result.response).toEqual(errorMessage);
      });
    });
  });

  describe('responseBody', () => {
    describe('when key exists in config', () => {
      it('returns 200', () => {
        const appConfig = { 'some-key': 'some-value' };
        const responseOptions = { responseKey: 'some-key' };

        const result = respond(responseOptions, appConfig);

        expect(result.statusCode).toEqual(200);
      });

      it('returns configured response', () => {
        const appConfig = { 'some-key': 'some-value' };
        const responseOptions = { responseKey: 'some-key' };

        const result = respond(responseOptions, appConfig);

        expect(result.response).toEqual('some-value');
      });
    });

    describe('when config is not supplied', () => {
      it('returns error response', () => {
        const responseOptions = { responseKey: 'some-key' };

        const result = respond(responseOptions, null);

        expect(result.response).toEqual(
          'Required config for responses not supplied.'
        );
      });

      it('returns 400', () => {
        const responseOptions = { responseKey: 'some-key' };

        const result = respond(responseOptions, null);

        expect(result.statusCode).toEqual(400);
      });
    });

    describe('when key is not in config', () => {
      it('returns error response', () => {
        const appConfig = { 'some-key': 'some-value' };
        const responseOptions = { responseKey: 'some-other-key' };

        const result = respond(responseOptions, appConfig);

        expect(result.response).toEqual(
          "Key: 'some-other-key' not found in supplied config."
        );
      });

      it('returns 400', () => {
        const appConfig = { 'some-key': 'some-value' };
        const responseOptions = { responseKey: 'some-other-key' };

        const result = respond(responseOptions, appConfig);

        expect(result.statusCode).toEqual(400);
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
        const callback = jest.fn();

        respond({ delay: 1 }, {}, callback);

        jest.advanceTimersByTime(999);
        expect(callback).not.toHaveBeenCalled();
        jest.advanceTimersByTime(1);
        expect(callback).toHaveBeenCalled();
      });
    });

    describe('when parameter is not a number', () => {
      it('returns 400', () => {
        const result = respond({ delay: 'not-a-number' }, {}, () => {});

        expect(result.statusCode).toEqual(400);
      });

      it('returns error message', () => {
        const result = respond({ delay: 'not-a-number' }, {}, () => {});

        expect(result.response).toEqual(
          'Invalid value for delay: not-a-number'
        );
      });
    });
  });
});
