'use strict';
const fs = require('fs');
const path = require('path');
function read_write (from, to, callback) {
    console.log(from, to)
    // fs.createReadStream(from).pipe(fs.createWriteStream(to));
    fs.createReadStream(from).on('data', function (chunk) {
        fs.appendFile(to, chunk, function (err) {
            console.log(err);
            if(typeof callback === 'function') {
                callback();
            }
        })
    })
}
function main () {
    let targetpath = './target.html';
    let target = fs.createWriteStream(targetpath);
    let rs = fs.createReadStream('./index.html', {
      flags: 'r',
      encoding: 'utf-8',
      fd: null,
      mode: '0666',
      bufferSize: 10 * 1024
    });
    let reg = /\<\?([\s\S]+?)\?\>/g;
    let ma;
    fs.writeFile(targetpath,'', function (err) {
        if(err) {
            console.log(err, '清空文件失败')
        }
    })
    rs.on('data', function (chunk) {
        let index = 0;

        function match_append () {        
            ma = reg.exec(chunk);
            if(ma) {
                let curIndex = ma.index;
                fs.appendFile(targetpath, chunk.substring(index, curIndex), function (err) {
                    console.log(err);
                });
                console.log(curIndex,index)
                index = curIndex + ma[0].length;
                let part = ma[1].trim().split(/\s+/);
                let partname = part[1].replace(/\'|\"|\;/g, '');
                console.log(partname);
                let file = partname+'.html';
                // file = path.normalize(file);
                read_write(file, targetpath, match_append);
            } else {
                reg.lastIndex = 0;
            }
        }
        match_append();
        // let res = chunk.split(reg);
        // console.log(chunk.match(reg))
        // console.log(res, res.length)
    })
    rs.on('end', function () {
        console.log('file end');
    })
}
main();