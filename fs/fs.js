'use strict';
var fs = require('fs');

var data = '';

var txt = fs.createReadStream('1.txt');

txt.setEncoding('utf8');

txt.on('data', function (chunk) {
    data += chunk;
})

txt.on('end', function () {
    console.log(data);
})

console.log('读取完毕');

var text = fs.createWriteStream('2.txt');
text.write('gggggggggggggggg', 'utf8');
text.end();
text.on('finish', function () {
    console.log('finish')
})