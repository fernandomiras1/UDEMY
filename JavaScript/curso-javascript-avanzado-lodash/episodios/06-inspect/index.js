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
];
// -_-_-_-_- REPL SESSION STARTS HERE -_-_-_-_-
// const family = people.map( group => group.map( person => {
//   const randGroup = people[random(0, people.length -1 )];
//   const randGuy = randGroup[random(0, randGroup.length -1 )];
//   return Object.assign(person, {sibling: randGuy });
// }));


const family = people.map( 
  group => group.map( 
    person => assign(person, {
      sibling: sample(sample(people))
    })
  ));


let Cosa = {
  _mal: 99,
  name: 'satan',
  surname: 'blu',
  inspect(){
    return 'Cosa(' + this.name + ')';
  }
}