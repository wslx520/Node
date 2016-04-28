'use strict';
const gm = require('gm');
const fs = require('fs');
const path = require('path');

const sizes = [1600,1440,1366,1280];

const curpath = process.cwd()
fs.readdir(curpath, function (err, files) {
    if(err) {
        return console.log(err);
    }
    // console.log(files);
    files.forEach(function (file) {
        let extname = path.extname(file);
        let filename = path.basename(file, extname)
        if(/jpg|png|jpeg/.test(extname)) {
            let picpath = curpath+'/'+file;
            let whRatio = 0;
            console.log(picpath, path.normalize(picpath))
            gm(picpath).size(function (err, size) {
                    // console.log(err, size);
                if(!err) {
                    whRatio = size.height/size.width;
                    sizes.forEach(function (sz) {
                        let height = (sz * whRatio)|0;
                        console.log(sz, height)
                        gm(picpath).resize(sz, sz * whRatio)
                            // 100体积比90大几倍
                            .quality(90)
                            .write(curpath+'/'+filename + '_' + sz + 'x'+ height + extname,
                                function (err) {
                                    if(!err) console.log(file, sz, 'done.');
                                })
                    })
                }
            })
            gm()
                .resize()
        }
    })
})