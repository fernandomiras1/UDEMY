// Tipos de Dato en JavaScript
let valor;

valor = 'Fernando';
valor = 20;
valor = false;
valor = { name: 'Fer' };
valor = null;
 // Symbol
valor = Symbol('fer');
console.log( typeof valor);

// Convertir String a Numeros en JavaScript

const numero1 = '50',
    numero2 = 10,
    numero3 = 'tres';

console.log( Number(numero1)  + numero2 );
// otra forma es con el parseInt
console.log( parseInt(numero1)  + numero2 );

// Template literals en JavaScript

const producto1 = 'Pizza',
    precio1 = 20,
    producto2 = 'Hamburuesa'
    precio2 = 40;

let html;

html = `
    <ul>
        <li>Orden: ${ producto1 } </li>
        <li>Precio: ${ precio1 } </li>
        <li>Orden: ${ producto2 } </li>
        <li>Precio: ${ precio2 } </li>
        <li><strong>TOTAL</strong>: ${ total(precio1, precio2) } </li>
    </ul>`;

function total(precio1, precio2) {
    return precio1 + precio2;
}

document.getElementById('app').innerHTML = html;
