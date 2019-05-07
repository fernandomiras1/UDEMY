// manejo de cadenas en JavaScript
let aprendiendo = 'Aprendiendo',
    lenguaje = 'JavaScript';

// Puedes agregar mas contenido    
console.log(aprendiendo.concat(' ', 'nuevos lenguajes'));
// Mayuscylas
console.log(aprendiendo.toUpperCase());
// Minusculas
console.log(aprendiendo.toLowerCase());

let mensaje = 'Aprendiendo JavaScript, CSS, HTML para ser FrontEnd';

// Buscar una palabra en especifico. FORMA 1 ( return number )
console.log( mensaje.indexOf('CSS')); // devuele la posicion donde esta. 
console.log( mensaje.indexOf('PHP')); // cuando no lo encuentra te devuelve un -1

// Buscar una palabra en especifico. FORMA 2 ( return boolean )
console.log( mensaje.includes('CSS')); // si lo encuentra devuelve un true. 
console.log( mensaje.includes('PHP')); // si no lo encuentra devuelve un false.
 
// Cortar el texto dependiendo de la poscicion 
// FORMA 1
console.log( mensaje.substring(0,11)); // cuenta del 0 al 11, y al resto lo deja afuera
// FORMA 2
console.log( mensaje.slice(-3)); // si es negativo comienza de atras hacia adelante.
console.log( mensaje.slice(3, 11)); // si es positivo comienza de adelante hacia atras.

// Cortar el texto
console.log( mensaje.split(' '));
// Reemplazar el texto
console.log( mensaje.replace('CSS', 'PHP'));
// Repetir el texto
console.log( lenguaje.repeat(10));