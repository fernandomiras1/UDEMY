'use strict';
const { sample, random, assign } = require('lodash');
// -_-_-_-_- REPL SESSION STARTS HERE -_-_-_-_-
const people = [
  [
    {
      name: 'Enid',
      job: 'Supervisor',
      age: 39,
      startedAt: 2017,
      workingAt: 'Holy See (Vatican City State)',
      likings: { color: 'sky blue', programmingLanguage: 'Pascal' }
    }
  ],
  [
    {
      name: 'Adeline',
      job: 'Orchestrator',
      age: 53,
      startedAt: 2018,
      workingAt: 'Sao Tome and Principe',
      likings: { color: 'white', programmingLanguage: 'Visual Basic' }
    },
    {
      name: 'Lessie',
      job: 'Developer',
      age: 45,
      startedAt: 2018,
      workingAt: 'Poland',
      likings: { color: 'silver', programmingLanguage: 'PL/SQL' }
    }
  ],
  [
    {
      name: 'Lavonne',
      job: 'Developer',
      age: 58,
      startedAt: 2018,
      workingAt: 'Belize',
      likings: { color: 'indigo', programmingLanguage: 'Scratch' }
    },
    {
      name: 'Darian',
      job: 'Officer',
      age: 43,
      startedAt: 2018,
      workingAt: 'Gambia',
      likings: { color: 'turquoise', programmingLanguage: 'Assembly language' }
    },
    {
      name: 'Nichole',
      job: 'Supervisor',
      age: 19,
      startedAt: 2018,
      workingAt: 'Saudi Arabia',
      likings: { color: 'ivory', programmingLanguage: 'Javascript' },
    }
  ]
];// -_-_-_-_- REPL SESSION STARTS HERE -_-_-_-_-
5 + 6; /* 11 */
'a ' + ' b'; /* 'a  b' */
'6' + 5; /* '65' */
const arr = [1, 2, 3, 4];
__clear; /* [Function: clear] */
__clear();
console.log(arr);
console.log(...arr);
Math.max(1, 2); /* 2 */
Math.max(1, 2, 3, 4, 5, 6, 7, 99); /* 99 */
Math.max(arr); /* NaN */
Math.max(arr, 44); /* NaN */
Math.max(arr[0], arr[1], arr[2]); /* 3 */
Math.max(...arr); /* 4 */
Math.max(33, ...arr); /* 33 */
Math.max(33, ...arr, 88); /* 88 */
Math.max(33, ...arr, 88); /* 88 */
Math.max.apply(Math, arr); /* 4 */
const arr2 = [...arr, 34];
arr2; /* [ 1, 2, 3, 4, 34 ] */
const arr3 = [...arr, 34, 44, 55, ...arr];
arr3; /* [ 1, 2, 3, 4, 34, 44, 55, 1, 2, 3, 4 ] */
const arr3 = [...arr, 34, 44, 55, ...arr, ...arr1]; /* null */
const arr4 = [...arr, 34, 44, 55, ...arr, ...arr1]; /* null */
arr4; /* null */
const arr4 = [...arr, 34, 44, 55, ...arr, ...arr]; /* null */
arr4; /* null */
const arr5 = [...arr, 34, 44, 55, ...arr, ...arr];
arr5; /* [ 1, 2, 3, 4, 34, 44, 55, 1, 2, 3, 4, 1, 2, 3, 4 ] */
let urr;
console.log(...urr); /* null */
let rur = [...urr]; /* null */
urr;
rur; /* null */
let rur = [...undefined]; /* null */
let rur = [...null]; /* null */
rur; /* null */
function fun() {
  console.log(arguments);
}
fun();
fun(1, 2, 3, 4);
function fan() {
  console.log(...arguments);
}
fan();
fan(1, 2, 3, 444, 'fe');
function fan() {
  console.dir(...arguments);
}
function fen() {
  console.dir(arguments);
}
fen();
function fen() {
  console.dir(arguments, { colors: true, depth: 4 });
}
fen();
__clear; /* [Function: clear] */
__clear();
function* gen(max) {
  while (--max) {
    yield max * 3;
  }
}
gen(23); /* {} */
console.log(gen(23));
console.dir(gen(23));
x = gen(32); /* {} */
x; /* {} */
x.toString(); /* '[object Generator]' */
x.next(); /* { value: 93, done: false } */
x.next(); /* { value: 90, done: false } */
x.next(); /* { value: 87, done: false } */
x.next(); /* { value: 84, done: false } */
__clear; /* [Function: clear] */
__clear();
[
  ...x
]; /* [ 81,
  78,
  75,
  72,
  69,
  66,
  63,
  60,
  57,
  54,
  51,
  48,
  45,
  42,
  39,
  36,
  33,
  30,
  27,
  24,
  21,
  18,
  15,
  12,
  9,
  6,
  3 ] */
__clear();
const saludador = (a, b) => a + ' saluda a ' + b;
saludador('aaaa', 'pepe'); /* 'aaaa saluda a pepe' */
const saludadorM = (a, ...cosas) => a + ' saluda a ' + cosas.join();
saludadorM('Pepe', 'pepe'); /* 'Pepe saluda a pepe' */
saludadorM(
  'Pepe',
  'pepe',
  'pepita',
  'satanito'
); /* 'Pepe saluda a pepe,pepita,satanito' */
let [a, b, c, ...ff] = people;
a; /* [ { name: 'Enid',
    job: 'Supervisor',
    age: 39,
    startedAt: 2017,
    workingAt: 'Holy See (Vatican City State)',
    likings: { color: 'sky blue', programmingLanguage: 'Pascal' } } ] */
b; /* [ { name: 'Adeline',
    job: 'Orchestrator',
    age: 53,
    startedAt: 2018,
    workingAt: 'Sao Tome and Principe',
    likings: { color: 'white', programmingLanguage: 'Visual Basic' } },
  { name: 'Lessie',
    job: 'Developer',
    age: 45,
    startedAt: 2018,
    workingAt: 'Poland',
    likings: { color: 'silver', programmingLanguage: 'PL/SQL' } } ] */
c; /* [ { name: 'Lavonne',
    job: 'Developer',
    age: 58,
    startedAt: 2018,
    workingAt: 'Belize',
    likings: { color: 'indigo', programmingLanguage: 'Scratch' } },
  { name: 'Darian',
    job: 'Officer',
    age: 43,
    startedAt: 2018,
    workingAt: 'Gambia',
    likings: { color: 'turquoise', programmingLanguage: 'Assembly language' } },
  { name: 'Nichole',
    job: 'Supervisor',
    age: 19,
    startedAt: 2018,
    workingAt: 'Saudi Arabia',
    likings: { color: 'ivory', programmingLanguage: 'Javascript' } } ] */
__clear();
ff; /* [] */
typeof ff; /* 'object' */
Array.isArray(ff); /* true */
let [fua, ...fuu] = people;
fua; /* [ { name: 'Enid',
    job: 'Supervisor',
    age: 39,
    startedAt: 2017,
    workingAt: 'Holy See (Vatican City State)',
    likings: { color: 'sky blue', programmingLanguage: 'Pascal' } } ] */
fuu; /* [ [ { name: 'Adeline',
      job: 'Orchestrator',
      age: 53,
      startedAt: 2018,
      workingAt: 'Sao Tome and Principe',
      likings: [Object] },
    { name: 'Lessie',
      job: 'Developer',
      age: 45,
      startedAt: 2018,
      workingAt: 'Poland',
      likings: [Object] } ],
  [ { name: 'Lavonne',
      job: 'Developer',
      age: 58,
      startedAt: 2018,
      workingAt: 'Belize',
      likings: [Object] },
    { name: 'Darian',
      job: 'Officer',
      age: 43,
      startedAt: 2018,
      workingAt: 'Gambia',
      likings: [Object] },
    { name: 'Nichole',
      job: 'Supervisor',
      age: 19,
      startedAt: 2018,
      workingAt: 'Saudi Arabia',
      likings: [Object] } ] ] */
__clear();
let log = (...msg) => console.log('Estoy logando ', ...msg);
log();
log(1, 2, 3, 'al escondite inglés');
let log = (...msg) => console.log('Estoy logando ', msg); /* null */
log = (...msg) => console.log('Estoy logando ', msg); /* [Function: log] */
log(1, 2, 3, 'al escondite inglés');
arr; /* [ 1, 2, 3, 4 ] */
console.log([...arr]);
console.log(...[...arr]);
console.log(...[...arr]);
exit; /* null */
