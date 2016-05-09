var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    config = require('../js/config.js');

describe('Config', function() {
    it('class exists', function () {
        should.exist(config);
    });

    it('load function exists', function () {
        should.exist(config.loadFromFile);
    });

    it('load function reads from file', function() {
        var configObject = config.loadFromFile(__dirname + '/resources/test-config.json');
        expect(configObject['key']).to.equal('value');
    });
});
