'use strict';
const fi = require('figlet');
const ch = require('chalk');
const clear = require('clear');
clear();console.log('');
// console.info(ch.red(fi.textSync('High Order Functions')))



function youtube(){
    console.log('A random video is playing...');
}

const x = youtube;
// x();
// youtube();

// console.log( x === youtube);

// Acepta una función como parámetro
function HOF(fun){
    console.log('about to execute');
    fun();
}
// HOF(x);

// Devuelve una función como respuesta/return
function HOF2(num){

    return function(b){
        return num + b
    }
}

const add1 = HOF2(1);
// console.log(add1(1));


// Acepta una función como parámetro
// Devuelve una función como respuesta/return...
// ...o ambas cosas
function constant(logger,num){

    /// Lo que devuelve
    return function(){
        logger('Devolveré:', num);
        return num;
    }
}

const logVerde = (...args) => console.log(ch.green(...args))
const constante = constant(logVerde, 55);
// console.log(constante() * 100);

console.log(constante.toString());