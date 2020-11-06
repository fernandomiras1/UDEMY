#!/usr/bin/env node
'use strict';

const { createContext, runInContext } = require('vm');
const { readFileSync, appendFileSync } = require('fs');
const { resolve } = require('path');
const { red, blue, bold, green, yellow } = require('chalk');
const prettier = require('prettier');
const {inspect} = require('util');
const repl = require('repl');
const clear = require('clear');
const prompt = red.bold('GEEK! > ');

// ------ Context
const replContext = {
    __clear: clear,
    l: require('lodash'),
    u: require('./episodios/utils')
}

const line = Array(5).fill('-').join('_');
const filePath = resolve(process.argv[2] || 'repl_session.js');


// ----- Utils

const write = (code) => appendFileSync(filePath, prettier.format(code,{singleQuote: true}));

// ----- COMMANDS

const installCommands = (server) => {
    server.defineCommand('def',
        {
            help: 'Creates a variable on the current file with the result of the executed command',
            action(command){
                this.clearBufferedCommand();
                const ast = command.split('=');
                const res = runInContext(ast[1], this.context);
                write(`${ast[0]} = ${JSON.stringify(res)}`)
                this.displayPrompt();
            }
        }
    );
}

// ---- Initialization

write(`\n// ${line} REPL SESSION STARTS HERE ${line}\n`);
const fileContent = readFileSync(filePath,'utf8');
const evalOptions = {
    filename: filePath,
    lineOffset: fileContent.split('\n').length
};


const autocompleteRegex = /^try { .* } catch \(e\) {}$/;
const isAutoCompleteCmd = (x) => autocompleteRegex.test(x);
const isRecoverableError = (error) => 
    error.name === 'SyntaxError'
      ? /^(Unexpected end of input|Unexpected token|missing \) after argument list)/.test(error.message)
      : false;

const customEval = (cmd, context, filename, callback) => {
    
    let result = null;
    try{
        result = runInContext(cmd, context, evalOptions);
    } catch (e) {
        if (isRecoverableError(e)) {
          return callback(new repl.Recoverable(e));
        }
    }
    callback(null,result);
    if (isAutoCompleteCmd(cmd)) {
        return;
    };
    // console.info('Eval this: ',green(cmd.replace(/\n/,'')));
    const output =
        result === undefined
            ? cmd
            : `${cmd.trim()} /* ${inspect(result)} */\n`;

    write(output);
}

const customWriter = (input) => {
    console.log('Outputo', input)
    return yellow.bold(input)
}

const replServer = repl.start({
    prompt,
    ignoreUndefined: true,
    // writer: customWriter,
    eval: customEval,
    useColors: true,
})

// fileStream.on('data', process.stdin.write);
// process.stdin.on('data', (ch) => {
//     if (ch.toString() === 'x') {
//         process.stdout.cursorTo(0);
//         process.stdout.write(green('xxxx'))
//     }
// })

// ----- Context injection 
Object.assign(replServer.context, replContext, { repol: replServer});
runInContext(fileContent, replServer.context);
installCommands(replServer);

clear();
console.info(blue.bold('\nWelcome sir'));
console.info(green.bold('Functions on context: '),inspect(replContext, {depth: 0, colors: true}));
replServer.prompt();