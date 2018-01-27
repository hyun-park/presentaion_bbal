var fs = require('fs');
var options = {encoding:'utf8', flag:'r'};
var data = fs.readFileSync('file.txt', 'utf-8');
console.log('02 readSync: %s',data);

