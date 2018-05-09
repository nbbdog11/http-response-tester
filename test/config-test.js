const chai = require('chai');

const should = chai.should();
const { expect } = chai;
const config = require('../js/config.js');

describe('Config', () => {
  it('class exists', () => {
    should.exist(config);
  });

  it('load function exists', () => {
    should.exist(config.loadFromFile);
  });

  it('load function reads from file', () => {
    const configObject = config.loadFromFile(
      `${__dirname}/resources/test-config.json`
    );
    expect(configObject.key).to.equal('value');
  });
});
