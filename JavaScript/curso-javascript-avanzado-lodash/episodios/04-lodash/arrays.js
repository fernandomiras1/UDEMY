'use strict';
const clear = require('clear'); clear();console.log('');
const people = require('./people');

const {
    filter, reject
    , groupBy
    , maxBy, minBy
    , uniq , uniqBy
    , compact, map
    , flatten, flattenDeep, flattenDepth
    , orderBy
    , countBy
    , partition
    ,sampleSize,sample
    , keyBy
    , last, add
    , chain
    , zip, zipWith
    ,identity
} = require('lodash');
const {take} = require('lodash/fp');

let res;
res = filter(people, {job: 'Engineer'} ); // todas las personas en la cual su trabajo es Ing
// lo agrupa por la fecha 2017,2018
res = groupBy(people, 'startedAt');
// de 10 personas, los agrupamos por el color.
res = groupBy(people.slice(0,10), (p) => p.likings.color );
// El mayor de todos
res = maxBy(people, 'age')
// El primero que entró en la empresa
res = minBy(people, 'startedAt')
// Un ejemplo básico de obtener el máximo
res = maxBy([90,234,324,234,123,231])
// Obtener todos los valores únicos (no hay repetidos)
res = uniq([1,2,45,56,99,0,1,2,33,4,45])
// Obtenemos todos los nombres unicos.
res = uniqBy(people,'name')
// Eliminar valores vacíos o nulos de un array
res = compact(map(people,'age'))
// Aplanar un array de arrays 
res = flattenDeep([1,4,[32323],[2323232,434343, [1221],[[232323]]],[3232]],2)
// Ordenamos por edad
res = orderBy(people,'age')
// Ordenamos por ocupación ascendente y por edad descendnete
res = orderBy(
    filter(people,'age'),
    ['job', 'age'], ['asc', 'desc'] 
);
// Ejemplo de combinación de funciones
res = uniq(map(people, 'likings.color'));
// Cuenta los lenguajes de programacion:
res = countBy(people,'likings.programmingLanguage');
// contamos apariciones de cada elemento
res = countBy(['hola','pepito','que','pepito','hola']) 
// dividimos el mundo en dos ( los que les gusta java es un array y otros con los q no)
res = partition(people,{likings: {programmingLanguage: 'Java'}}) 
// obtenemos 3 aleatorios
res = sampleSize(people, 3) 
// indexamos por nombre
res = keyBy(people, 'name'); 
// const take2 = take(2);
// const take4 = take(4);
res = take4(people)
// podemos hacer varias trasformaciones
res = chain(people) 
        .filter('age') 
        .orderBy('age')
        .take(5)
        .last()
        .value();
// de un objeto devolvemos el mimo pero con un array [ ['a', 1], ['b',2], ['c',3] ]
res = (map({a: 1, b: 2, c: 3}, (v,k) => [k,v] ));
console.log( res );
console.log(zipWith(...res, (a,b,c) => a+b+c));
// console.log( people.length );
console.log('Res lenght:', res.length );



/**
 * 
 * Mi ejemplos 
 */

var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
// va a obtener el valor anidado facilemente.
_.get(object, 'a[0].b.c');
// => 3
 
_.get(object, ['a', '0', 'b', 'c']);
// => 3
 
_.get(object, 'a.b.c', 'default');
// => 'default'

var data = {
    properties: {
        daysFilter: [ 7, 14, 21, 28, 35, 42],
        environments: [
            { name: 'Develop', matchs: []},
            { name: 'Testing', matchs: ['sprint-']},
            { name: 'Staging', matchs: ['release-']},
            { name: 'Production', matchs: ['prod-']}
        ]
    }
}
// Obtengo los dias y si no esta le agrego [] , y agrego un map para sacar la info de esa forma.
var daysFilter =  _.get(data, 'properties.daysFilter', []).map(day => ({ value: day, name: `${day} días`}));

// si no encuetnra el avatar le pone ''
var avatarUrl =  _.get(item, 'user.avatarUrl', ''),

// Obtengo de forma segura la lista de enviroment y si no existe o algo le agrego un array vacio.
var environmentMappings = _.get(collector, 'properties.environments', []);


const data = [{
    name: "Alice",
    created_at : "2017-04-18"
},
{
    name: "James",
    created_at : "2017-06-30"
},
{
    name: "Melisa",
    created_at : "2017-04-03"
},
{
    name: "James",
    created_at : "2017-04-03"
},
{
    name: "Amy",
    created_at : "2017-05-03"
}];
const result = 
  _.chain(data)
    .groupBy("created_at") // aca mismo usar una funcion para pasar milliseconds to date
    .map((value, key) => ({ date: key, items: value, total: value.length }))
    .orderBy(it => it.date, ['asc'])
    .value()

// Te lo agrupa por la fecha asc y map lo develve de esa forma el objeto.
console.log(JSON.stringify(result, null, 2));


// Te lo agrega en un array ["fer","miras","hola"]

var data = 'fer ,miras,hola';
result = 
  _.chain(data)
    .split(',')
    .map(value => value.trim())
    .value()

/**
 * Result
 * 
 *  [
        "fer",
        "miras",
        "hola"
    ]
    * 
    */
   