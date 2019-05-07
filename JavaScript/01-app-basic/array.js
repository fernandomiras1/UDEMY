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

//console.log(meses);