'use strict';
const { sample, random } = require('lodash');
// -_-_-_-_- REPL SESSION STARTS HERE -_-_-_-_-
const people = [
  {
    name: 'Enid',
    job: 'Supervisor',
    age: 39,
    startedAt: 2017,
    workingAt: 'Holy See (Vatican City State)',
    likings: { color: 'sky blue', programmingLanguage: 'Pascal' }
  },
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
  },
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
  }
];

const getName = ({ name }) => name;

const map = (arr, fn) => {
  const result = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    result.push(fn(arr[i]));
  }
  return result;
};

const filter = (arr, predicado) => {
  const result = [];
  for(let i=0, l = arr.length; i < l; i++){
    if(predicado(arr[i])){
      result.push(arr[i]);
    }
  }
  return result;
}


const nombresDePeople = people.map(getName);

// for (let i = 0, l=people.length; i<l; i++) {
//   const element = people[i];
//   nombresDePeople.push(getName(element));
// }

console.log(nombresDePeople);

const menoresDe50 = filter(people, ({age})=> age < 50)

// console.log(menoresDe50);




const perros = [
  { name: 'Toby', raza: 'Pastor Alemán', age: 1 }
  , { name: 'Toto', raza: 'Salchicha', age: 3 }
  , { name: 'Risky', raza: 'Galgo', age: 2 }
  , { name: 'Pluma', raza: 'Galgo', age: 3 }
];

const nombresDePerros = map(perros, getName);
// for(let i=0, l= perros.length; i<l; i++){
//   nombresDePerros.push(getName(perros[i]));
// };

console.log(nombresDePerros);
console.log(filter(perros, ({age})=> age < 3));








const salchichas = [
  { name: 'Bierwurst', size: 22 }
  , { name: 'Blutwurst', size: 44 }
  , { name: 'Bockwurst', size: 34 }
  , { name: 'Bratwurst', size: 14 }
];

const nombresDeSalchichas = map(salchichas, getName);
// for(let i=0, l=salchichas.length; i<l; i++){
//   nombresDeSalchichas.push(salchichas[i].name);
// }

console.log(nombresDeSalchichas);
console.log(filter(salchichas, ({size})=> size < 15));



const numerazos = [1, 3, 5444, 564, random(1, 999)];
const listaDeSuperNumerazos = map(numerazos, (n) => n * 2);
// for(let i= 0, l=numerazos.length; i<l; i++){
//   listaDeSuperNumerazos.push(numerazos[i] * 2)
// }

console.log(listaDeSuperNumerazos);// -_-_-_-_- REPL SESSION STARTS HERE -_-_-_-_-
l.map(null, l.add(1)); /* [] */
x = null; /* null */
x.map(i => i + 1); /* null */
