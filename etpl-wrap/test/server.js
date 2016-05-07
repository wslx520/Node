'use strict';
const ETPL = require('../index.js');
const fs = require('fs');
const path = require('path');
const http = require('http');
// console.log(ETPL)
let etpl = new ETPL('./views','.html')

console.log(path.join('a/b/c','../b/bb'))
setTimeout(function  () {
    console.log(etpl.render('index', {
        title:'欢迎！',
        welcome:'非常欢迎你'
    }))
},1000)

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type':'text/html'
    })
    res.end(etpl.render('index', {
        title:'欢迎！',
        welcome:'非常欢迎你',
        em:'a string in a EM'
    }))
}).listen(3001);