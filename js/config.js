const fs = require('fs');

const loadFromFile = filename => JSON.parse(fs.readFileSync(filename, 'utf8'));

module.exports = { loadFromFile };
