'use strict';
const fs = require('fs');

function main () {
    var target = fs.createWriteStream('./target.html');
    var rs = fs.createReadStream('./index.html', {
      flags: 'r',
      encoding: 'utf-8',
      fd: null,
      mode: '0666',
      bufferSize: 10 * 1024
    });
    rs.on('data', function (chunk) {
        let reg = /\<\?[\s\S]+?\?\>/g;
        let res = chunk.split(reg);
        console.log(chunk.match(reg))
        console.log(res, res.length)
    })
}
main();