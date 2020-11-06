'use strict';

const figlet = require('figlet')
const chalk = require('chalk');
const {promisify} = require('util');

const colorize = (color, msg) => console.log(chalk.bold[color](msg))
const colors = ['black' ,'red' ,'green' ,'yellow' ,'blue' ,'magenta' ,'cyan' ,'white' ,'redBright' ,'greenBright' ,'yellowBright' ,'blueBright' ,'magentaBright' ,'cyanBright' ,'whiteBright']
const rand = (max) => ((Math.random() * 1000) % max)|0
const randColor = () => colors[rand(colors.length)]
const banner = promisify(figlet);
const timeout = (fn, tim, args ) => new Promise( resolve => setTimeout(() => resolve(fn(...args)), tim ))

Promise.all(('CURSO AVANZADO DE ES6 by EL GEEK CURIOSO').split(' ').map( 
    (v,i) => timeout(banner, i * 1000, [v])
                .then( b => colorize(randColor(),b.replace(/^/gm,Array(i).fill('\t\t').join(''))))
))