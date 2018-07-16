/* eslint-disable no-unused-expressions */
const { statusCode, responseBody, delay } = require('../js/responder.js');

describe('Responder', () => {
  describe('function defined', () => {
    it('statusCode', () => {
      expect(statusCode).toBeDefined();
      expect(statusCode).not.toBeNull();
    });
    it('responseBody', () => {
      expect(responseBody).toBeDefined();
      expect(responseBody).not.toBeNull();
    });
    it('delay', () => {
      expect(delay).toBeDefined();
      expect(delay).not.toBeNull();
    });
  });

  describe('statusCode', () => {
    const errorMessage = 'Please request a valid status code.';
    it('returns input status code', () => {
      const expectedStatusCode = 200;

      const result = statusCode(expectedStatusCode);

      expect(result.statusCode).toEqual(expectedStatusCode);
    });

    it('handles input strings', () => {
      const expectedStatusCode = '200';

      const result = statusCode(expectedStatusCode);

      expect(result.statusCode).toEqual(200);
    });
    describe('when input is null', () => {
      it('returns 400', () => {
        const result = statusCode(null);

        expect(result.statusCode).toEqual(400);
      });

      it('sets proper error message', () => {
        const result = statusCode(null);

        expect(result.response).toEqual(errorMessage);
      });
    });

    describe('when input is not a number', () => {
      it('returns 400', () => {
        const result = statusCode('not-a-number');

        expect(result.statusCode).toEqual(400);
      });

      it('sets proper error message', () => {
        const result = statusCode('not-a-number');

        expect(result.response).toEqual(errorMessage);
      });
    });
  });

  describe('responseBody', () => {
    describe('when key exists in config', () => {
      it('returns 200', () => {
        const config = { 'some-key': 'some-value' };

        const result = responseBody(config, 'some-key');

        expect(result.statusCode).toEqual(200);
      });

      it('returns configured response', () => {
        const config = { 'some-key': 'some-value' };

        const result = responseBody(config, 'some-key');

        expect(result.response).toEqual('some-value');
      });
    });

    describe('when config is not supplied', () => {
      it('returns error response', () => {
        const result = responseBody(null);

        expect(result.response).toEqual(
          'Required config file for responses not supplied.'
        );
      });

      it('returns 400', () => {
        const result = responseBody(null);

        expect(result.statusCode).toEqual(400);
      });
    });

    describe('when key is not in config', () => {
      it('returns error response', () => {
        const config = { 'some-key': 'some-value' };

        const result = responseBody(config, 'some-other-key');

        expect(result.response).toEqual(
          'Key: some-other-key not found in supplied config.'
        );
      });

      it('returns 400', () => {
        const config = { 'some-key': 'some-value' };

        const result = responseBody(config, 'some-other-key');

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

        delay(1, callback);

        jest.advanceTimersByTime(999);
        expect(callback).not.toHaveBeenCalled();
        jest.advanceTimersByTime(1);
        expect(callback).toHaveBeenCalled();
      });
    });

    describe('when parameter is not a number', () => {
      it('returns 400', () => {
        const result = delay('not-a-number');

        expect(result.statusCode).toEqual(400);
      });

      it('returns error message', () => {
        const result = delay('not-a-number');

        expect(result.response).toEqual(
          'Invalid value for delay: not-a-number'
        );
      });
    });
  });
});
