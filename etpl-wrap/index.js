'use strict';
const ETPL = require('etpl');
if(!ETPL) throw new Error('You must install etpl before use etpl-wrap');

const fs = require('fs');
const path = require('path');

const extend = function (old, newone) {
    for(let n in newone) {
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
    missTarget:'ignore',
    // 新增的设置
    root:'',
    extname:'.html', // 模板文件后缀
    mainFile:'index' // 主模板文件名（不含后缀）
};

let DEBUG = true;
let log = DEBUG ? console.log : function() {};
let extNames = {};
let mainFiles = {};
let targetReg = /\s*target\s*:\s*([a-z0-9\/_-]+)\s*/;
let targetcmdReg = null;
let importcmdReg = null;
// 遍历指定目录下的所有文件及目录，并对[文件]执行回调
function walk(root, callback) {   
     // 保持对EtplWrap的指向
    let self = this;
    fs.readdir(root, function (err, files) {
        if(!err) {
            files = files.filter(function (filename, index) {
                let stat = fs.statSync(path.resolve(root, filename));
                log('isFile? ', stat.isFile())
                if(stat.isFile()) {
                    callback.call(self, path.resolve(root, filename), filename);                 
                } else {
                    walk.call(self, path.resolve(root, filename), callback);
                }
            })
        }
    })
}
function compileFile (filepath, filename) {
    log('find a template: '+filename)
    let self = this;
    let options = self.options;
    let extName = path.extname(filename);
    let open = options.commandOpen;
    let close = options.commandClose;
    if(!targetcmdReg) {
        targetcmdReg = new RegExp(options.commandOpen + targetReg.source + close, 'ig');
        // log(targetcmdReg)
    }
    if(!importcmdReg) {
        importcmdReg = new RegExp(options.commandOpen + '\\s*import\\s*:\\s*([a-z0-9\\/_-]+)\\s*' + close, 'ig');
        // log(importcmdReg)
    }
    fs.readFile(filepath, function (err, content) {
        if (!err) {
            content = content.toString('utf8').trim();
            // 保存下当前模板文件的主targetName
            let mainTarget = null;
            let firstTargetCmd = null;
            let dir = '';

            let relative = path.relative(options.root, filepath);
            // 是否在子目录中
            let insubdir = relative.indexOf(path.sep) > -1;
            log('relative',relative, insubdir);
            // 当前子目录
            if(insubdir) {
                dir = path.dirname(relative);;
            }
            // log('------------------------',dir)
            // 快速判断出第一句是不是target声明
            if (
                // 如果不是以命令语句开头
                content.substr(0, open.length) != open 
                // 或命令不是target命令
                || !targetReg.test(content.substr(open.length, content.indexOf(close)))
            ) {
                let justname = relative.slice(0, -extName.length);
                // 如果是主模板文件，且位于子目录中，则以其目录名做target名
                if(mainFiles[path.basename(justname)] && insubdir) {
                    justname = dir = path.dirname(justname);
                }
                justname = justname.replace(/\\/g,'\/');
                log('generate target: ',justname)
                mainTarget = justname;
                firstTargetCmd = open + 'target:' + justname + close;
            }
            // 是以target声明开头，则直接取出第一个target name
            else {
                firstTargetCmd = content.substr(0, content.indexOf(close) + close.length);
                // 抛除第一句target
                content = content.substr(firstTargetCmd.length);
                mainTarget = targetcmdReg.test(firstTargetCmd) && RegExp.$1;
                log(firstTargetCmd,mainTarget);
            }
            // 如果是子目录下的模板，则检查content(已抛出第一个target声明)，转换其中的包含的其他target的路径
            if(insubdir) {
                content = content.replace(targetcmdReg, function (m, targetName) {
                    // log('main: ', m, mainTarget, targetName)
                    if(/\\|\//.test(targetName)) {
                        throw new Error('EtplWrap: when define target, it\'s name could not contains path separator.')
                    }
                    targetName = path.join(dir, targetName).replace(/\\/g,'/');
                    log('ttttttttttttttttttttttt', dir,targetName)
                    return open + 'target:' + targetName + close;
                })
                // 替换 import命令里目标target路径
                .replace(importcmdReg, function (m, targetName) {
                    targetName = path.join(dir, targetName).replace(/\\/g,'/');
                    log('iiiiiiiiiiiiiiiiiiiiiiiiii', dir,targetName)
                    return open + 'import:' + targetName + close;            
                })
            };
            // 将content补全
            content = firstTargetCmd + content;
            // log(content)
            self.engine.compile(content);
        }
    })
}
function EtplWrap(root, extname, conf) {
    this.engine = ETPL;
    this.options = extend({},defaultConfig);
    if(conf) {
        this.config(conf);
    }
    this.init(root, extname);
}

EtplWrap.prototype = {
    init: function (root, ext) {
        root = root || __dirname + '/views';
        ext = ext || '.html';
        let self = this;
        if('string' === typeof ext) {
            ext = [ext];
        }
        self.options.root = root;
        self.options.extname = ext;
        ext.forEach(function (xt) {
            if(xt.charAt(0) !== '.') {
                xt = '.'+xt;
            }
            extNames[xt] = 1;
        })
        let mainFile = self.options.mainFile;

        if('string' === typeof mainFile) {
            mainFile = [mainFile];
        }

        mainFile.forEach(function (mf) {
            mainFiles[mf] = 1;
        })
        log(mainFiles);
        // log('template path is ' + root);
        walk.call(self, root, compileFile);
        return ;
        fs.readdir(root, function (err, files) {
            if(!err) {
                files = files.filter(function (filename, index) {
                    let extName = path.extname(filename);
                    if(extNames[extName]) {
                        log('find a template: '+filename)
                        fs.readFile(path.resolve(root, filename), function (err, content) {
                            if(!err) {
                                content = content.toString('utf8').trim();
                                let firstline = content.slice(0, content.indexOf('\n'));
                                // log(firstline);
                                // 如果第一句没有target声明，则以文件名作target名补上
                                if(!targetReg.test(firstline)) {
                                    let tgt = self.options.commandOpen + ' target:' + filename.slice(0, -extName.length) + self.options.commandClose;
                                    content = tgt + content;
                                }
                                // log(content)
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