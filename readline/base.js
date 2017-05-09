const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('input a name: ', (answer) => {
    console.log('You have entered {%s}', answer.toUpperCase())

    rl.close();
})