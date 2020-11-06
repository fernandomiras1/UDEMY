'use strict';
const {range, random: rand} = require('lodash');
const {name, date, commerce, random, address} = require('faker');

const languages = ['Java', 'C', 'C++', 'C#', 'Python', 'Visual Basic .NET', 'PHP', 'JavaScript', 'Pascal', 'Swift', 'Perl', 'Ruby', 'Assembly language', 'R', 'Visual Basic', 'Objective-C', 'Go', 'MATLAB', 'PL/SQL', 'Scratch']

const makePeople = (n) => range(n).map(
    () => ({
        name: name.firstName(),
        job: name.jobType(),
        age: rand(18,71),
        startedAt: date.past().getFullYear(),
        workingAt: address.country(),
        likings: {
            color: commerce.color(),
            programmingLanguage: random.arrayElement(languages)
        }
    }));


module.exports = { rand, makePeople, name }
