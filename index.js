// Used to export assets to other projects via NPM
var fs = require('fs');

module.exports = fs.createReadStream(__dirname + '/index.html')