var fs = require('fs');

var data = "My first data...\r\nhello there!";

try{
    fs.writeFileSync('file02_sync.txt', data, 'utf-8');
    console.log('02 WRITE DONE!');
}catch(e){
    console.log(e);
}