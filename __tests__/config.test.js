const config = require('../js/config.js');

describe('Config', () => {
  it('class exists', () => {
    expect(config).toBeDefined();
    expect(config).not.toBeNull();
  });

  it('load function exists', () => {
    expect(config.loadFromFile).toBeDefined();
    expect(config.loadFromFile).not.toBeNull();
  });

  it('load function reads from file', () => {
    const configObject = config.loadFromFile(
      `${__dirname}/resources/test-config.json`
    );
    expect(configObject.key).toEqual('value');
  });
});
