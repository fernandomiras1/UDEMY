// Arreglos en JavaScript 

const numeros = [10,20,30,40,50,60];
console.log(numeros);

const meses = new Array('Enero', 'Ferero', 'Marzo', 'Abril');
// Saber la cant de elementos
console.log(meses.length);
// Saber si es un array ( retorna un boolean )
console.log(Array.isArray(meses));
// Agregamos un elemento
// push: Lo agrega al final del arreglo
meses.push('Mayo');
// unshift: Lo agrega al inicio del arreglo
meses.unshift('Mes 0 ');
// Buscar un elemento en un Arreglo
console.log( meses.indexOf('Abril') ); // te retrona el indice del arreglo 
// Eliminar el ultimo elemento del Arreglo
meses.pop();
// Elimina el primer elemento del Arreglo
meses.shift();
// Eliminar un elemento del Array
// el primero la posicion a elimianr, el segundo es la cant. de elementos.
meses.splice(1,1);
// Revertir el Array
meses.reverse();

// Unir un Arreglo con otro
let arreglo1 = [1,2,3],
    arreglo2 = [4,5,6];

console.log( arreglo1.concat( arreglo2 ) );

// Ordenar un Arreglo por Letra
const frutas = ['Platano', 'Pera', 'Manzana', 'Fresa'];
// Ordenar de forma asc
console.log(frutas.sort());

// Ordenar un Arreglo por Numeros
arreglo1 = [1,22,34,345,3,2,45,36];
// del menor al mayor
arreglo1.sort(function(x,y) {
    return x - y
});
// del mayor al menor 
arreglo1.sort(function(x,y) {
    return y - x
});

console.log( arreglo1 );
// Busca un elemento repetido en un lista. array
/**  remove-duplicates-from-array-of-objects-
 * 
 Before filtering:
 {"thing":[{"place":"here","name":"stuff"},{"place":"there","name":"morestuff"},{"place":"there2","name":"morestuff"}]}
 After filtering:
 [{"place":"here","name":"stuff"},{"place":"there","name":"morestuff"}]
 * 
 */


const things = new Object();

things.thing = new Array();

things.thing.push({place:"here", name:"stuff"});
things.thing.push({place:"there", name:"morestuff"});
things.thing.push({place:"there2", name:"morestuff"});

console.log(things);
appDiv.innerHTML += `<div>Before filtering:</div>`;
appDiv.innerHTML += `<pre>${ JSON.stringify(things) }</pre>`;
const uniqueArray = things.thing.filter((thing, index) => {
  return index === things.thing.findIndex(obj => {
    return obj.name === thing.name;
  });
});


console.log(uniqueArray);
//console.log(meses);

var dataAntes = [
  {
    "nombre": "MERLO",
    "acronimos": [
      {
        "localidad": "MERLO",
        "name": "SL196",
        "selected": true
      }
    ]
  },
  {
    "nombre": null,
    "acronimos": [
      {
        "localidad": null,
        "name": "TNQ126",
        "selected": true
      },
      {
        "localidad": null,
        "name": "TNQ127",
        "selected": true
      },
      {
        "localidad": null,
        "name": "TNQ128",
        "selected": true
      },
      {
        "localidad": null,
        "name": "TNQ131",
        "selected": true
      }
    ]
  }
]


var dataAhora = dataAntes.map(group => group.acronimos.map(a=> a.name))
.reduce((acc, val) => acc.concat(val), []);


// quedaria de esta forma
dataAhora = [
  "SL196",
  "TNQ126",
  "TNQ127",
  "TNQ128",
  "TNQ131"
]