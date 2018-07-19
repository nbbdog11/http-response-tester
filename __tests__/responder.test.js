/* eslint-disable no-unused-expressions */
const respond = require('../js/responder');
const Response = require('../js/Response');

describe('respond', () => {
  const responseCallback = jest.fn();
  beforeEach(() => {
    responseCallback.mockReset();
  });

  describe('status code', () => {
    const errorMessage = 'Please request a valid status code.';
    it('returns input status code', () => {
      const statusCode = 200;
      const expectedResponse = new Response(statusCode, '');

      respond({ status: statusCode }, {}, responseCallback);

      expect(responseCallback).toHaveBeenCalledWith(expectedResponse);
    });

    it('handles input strings', () => {
      const statusCode = '200';
      const expectedResponse = new Response(200, '');

      respond({ status: statusCode }, {}, responseCallback);

      expect(responseCallback).toHaveBeenCalledWith(expectedResponse);
    });

    describe('when input is null', () => {
      it('returns 400 with proper error message', () => {
        const statusCode = null;
        const expectedResponse = new Response(400, errorMessage);

        respond({ status: statusCode }, {}, responseCallback);

        expect(responseCallback).toHaveBeenCalledWith(expectedResponse);
      });
    });

    describe('when input is not a number', () => {
      it('returns 400 with proper error message', () => {
        const statusCode = 'not-a-number';
        const expectedResponse = new Response(400, errorMessage);

        respond({ status: statusCode }, {}, responseCallback);

        expect(responseCallback).toHaveBeenCalledWith(expectedResponse);
      });
    });
  });

  describe('responseBody', () => {
    describe('when key exists in config', () => {
      it('returns 200 with configured response', () => {
        const responseOptions = { responseKey: 'some-key' };
        const appConfig = { 'some-key': 'some-value' };
        const expectedResponse = new Response(200, 'some-value');

        respond(responseOptions, appConfig, responseCallback);

        expect(responseCallback).toHaveBeenCalledWith(expectedResponse);
      });
    });

    describe('when config is not supplied', () => {
      it('returns 400 with proper error message', () => {
        const responseOptions = { responseKey: 'some-key' };
        const expectedResponse = new Response(
          400,
          'Required config for responses not supplied.'
        );

        respond(responseOptions, null, responseCallback);

        expect(responseCallback).toHaveBeenCalledWith(expectedResponse);
      });
    });

    describe('when key is not in config', () => {
      it('returns 400 with proper error message', () => {
        const responseOptions = { responseKey: 'some-other-key' };
        const appConfig = { 'some-key': 'some-value' };
        const expectedResponse = new Response(
          400,
          "Key: 'some-other-key' not found in supplied config."
        );

        respond(responseOptions, appConfig, responseCallback);

        expect(responseCallback).toHaveBeenCalledWith(expectedResponse);
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
        const expectedResponse = new Response(200, '');

        respond({ delay: 1 }, {}, responseCallback);

        jest.advanceTimersByTime(999);
        expect(responseCallback).not.toHaveBeenCalled();
        jest.advanceTimersByTime(1);
        expect(responseCallback).toHaveBeenCalledWith(expectedResponse);
      });
    });

    describe('when parameter is not a number', () => {
      it('returns 400 with proper error message', () => {
        const expectedResponse = new Response(
          400,
          'Invalid value for delay: not-a-number'
        );

        respond({ delay: 'not-a-number' }, {}, responseCallback);

        expect(responseCallback).toHaveBeenCalledWith(expectedResponse);
      });
    });
  });

  describe('composed response', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });
    beforeEach(() => {
      jest.clearAllTimers();
    });

    it('returns requested status code with requested body', () => {
      const appConfig = {
        'some-key': 'some-value'
      };
      const responseOptions = {
        status: 204,
        responseKey: 'some-key'
      };
      const expectedResponse = new Response(204, 'some-value');

      respond(responseOptions, appConfig, responseCallback);

      expect(responseCallback).toHaveBeenCalledWith(expectedResponse);
    });

    it('returns requested status code after requested delay', () => {
      const responseOptions = {
        status: 204,
        delay: 1
      };
      const expectedResponse = new Response(204, '');

      const callback = jest.fn();

      respond(responseOptions, {}, callback);

      jest.advanceTimersByTime(999);
      expect(callback).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledWith(expectedResponse);
    });

    it('returns requested status code after requested delay with requested body', () => {
      const responseOptions = {
        status: 204,
        delay: 1,
        responseKey: 'some-key'
      };
      const appConfig = {
        'some-key': 'some-value'
      };
      const expectedResponse = new Response(204, 'some-value');

      const callback = jest.fn();

      respond(responseOptions, appConfig, callback);

      jest.advanceTimersByTime(999);
      expect(callback).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledWith(expectedResponse);
    });

    it('aggregates multiple errors', () => {
      const appConfig = {
        'some-key': 'some-value'
      };
      const responseOptions = {
        status: null,
        responseKey: 'some-other-key'
      };
      const expectedErrors = [
        'Please request a valid status code.',
        "Key: 'some-other-key' not found in supplied config."
      ];
      const expectedErrorString = expectedErrors.join('\n');
      const expectedResponse = new Response(400, expectedErrorString);

      respond(responseOptions, appConfig, responseCallback);

      expect(responseCallback).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
