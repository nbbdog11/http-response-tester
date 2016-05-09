var fs = require('fs');

var config = {
    loadFromFile: function(filename) {
        return JSON.parse(fs.readFileSync(filename, 'utf8'));
    }
};
module.exports = config;