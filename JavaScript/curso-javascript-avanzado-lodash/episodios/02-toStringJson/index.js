'use strict';
const fi = require('figlet');
//const ch = require('chalk');
const clear = require('clear');
clear();console.log('');
// console.info(ch.blue(fi.textSync('toString & toJSON')))

const remoteApi = x => console.log(x)


class Person {
    constructor( name,lastName, 
        age = 18, sex ='M', pin ='0000', password = 'pass'
    ){
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.age = age;
        this.sex = sex;
        this.pin = pin;
    }

    toString(){
        return this.name + ' ' + this.lastName;
    }

    toJSON(){
        return { name: this.name, age: this.age}
    }
}

const maria = new Person('Maria','Fernandez', 23, 'F', 1002, 'satán');
const pepe = new Person('Pepe','Rodriguez', 21, 'M', 12345, 'buen pass');

// remoteApi(JSON.stringify(pepe));
// console.log(pepe);



const frac = {
    divisor: 9,
    dividendo: 8,
    __meta: 'esto mola',
    toString() {return '9 dividido por 8'},
    toJSON(){
        return { divisor: this.divisor, dividendo: this.dividendo}
    }
}

console.log(frac);
console.log(frac + ' mola');