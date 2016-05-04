'use strict';
const ETPL = require('etpl');
if(!ETPL) throw new Error('You must install etpl before use EtplWrap');

const fs = require('fs');
const path = require('path');

const extend = function (old, newone) {
    for(var n in newone) {
        if(newone.hasOwnProperty(n)) {
            old[n] = newone[n];
        }
    }
    return old;
}
// etpl默认配置--与etpl模板引擎本身一致
const defaultConfig = {
        commandOpen:'<!--',
        commandClose:'-->',
        commandSyntax:null,
        variableOpen:'${',
        variableClose:'}',
        defaultFilter:'html',
        strip:false,
        namingConflict:'error',
        missTarget:'ignore'
    };
function EtplWrap(root, extname, conf) {
    this.engine = ETPL;
    this.init(root, extname);
    this.options = extend({},defaultConfig);
}
EtplWrap.prototype = {
    init: function (root, ext) {
        root = root || __dirname + '/views';
        ext = ext || '.html';
        let self = this;
        let extNames = {};


        if('string' === typeof ext) {
            ext = [ext];
        }

        ext.forEach(function (xt) {
            if(xt.charAt(0) !== '.') {
                xt = '.'+xt;
            }
            extNames[xt] = 1;
        })
        console.log('template path is ' + root);
        fs.readdir(root, function (err, files) {
            if(!err) {
                let targetReg = /target\s*:/;
                files = files.filter(function (filename, index) {
                    let extName = path.extname(filename);
                    if(extNames[extName]) {
                        console.log('find a template: '+filename)
                        fs.readFile(path.resolve(root, filename), function (err, content) {
                            if(!err) {
                                content = content.toString('utf8').trim();
                                let firstline = content.slice(0, content.indexOf('\n'));
                                // console.log(firstline);
                                // 如果第一句没有target声明，则以文件名作target名补上
                                if(!targetReg.test(firstline)) {
                                    let tgt = self.options.commandOpen + ' target:' + filename.slice(0, -extName.length) + self.options.commandClose;
                                    content = tgt + content;
                                }
                                // console.log(content)
                                self.engine.compile(content);
                            }
                        })
                    }
                })
            }
        })
    },
    config: function (conf) {
        return this.engine.config(extend(this.options, conf));
    },
    render: function (target, data) {
        return this.engine.render(target, data);
    }
}
module.exports =  EtplWrap;