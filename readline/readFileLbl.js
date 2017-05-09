// read text file line by line

const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
    // input 指定为一个文件流
    input: fs.createReadStream('./a.txt')
})

rl.on('line', line => {
    console.log(~line.indexOf('l'));
})