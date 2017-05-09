// auto complete

const readline = require('readline')
const fs = require('fs')

const command = 'npm'
const subCommands = ['help', 'init', 'install']

// 自动完成接口，当按下tab时触发
// 接受用户当前的输入行为参数
function completer(line) {
    if (!line.length || (line.length < command.length && command.startsWith(line))) {
        return [[command], line];
    }
    // 提取符合部分字符的子命令
    let hits = subCommands.filter(subCommand => {
        // 将用户输入中的命令前缀除开（即 npm）
        let lineTrippedCommand = line.replace(command, '').trim();
        // 判断除开后是否还有子命令
        return lineTrippedCommand && subCommand.startsWith(lineTrippedCommand)
    })
    // 如果只匹配到一个子命令
    if (hits.length === 1) {
        // 将匹配到的子命令前面加上根命令（即npm ）
        hits = hits.map(hit => {
            return [command, hit].join(' ')
        })
    }
    // 返回形式必须是这样：[[...], line]
    // 如果有匹配到子命令则返回；否则返回所有子命令
    return [hits.length ? hits : subCommands, line];
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: completer
})

rl.prompt();