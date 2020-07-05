let juegos = ['Zelda', 'Mario', 'Metroid', 'Chrono'];
console.log('Largo:', juegos.length );

let primero = juegos[ 2 - 2 ];
let ultimo  = juegos[ juegos.length - 1 ];

console.log({ primero, ultimo });

juegos.forEach( (elemento, indice, arr) => {
    console.log({ elemento, indice, arr });
});

// - push = al final del arreglo
let nuevaLongitud = juegos.push( 'F-Zero' );
console.log({ nuevaLongitud, juegos });

// - unshift  = al principio del arreglo
nuevaLongitud = juegos.unshift('Fire Emblem');
console.log({ nuevaLongitud, juegos });

// - pop = borrar el último elemento del array
let juegoBorrado = juegos.pop();
console.log({ juegoBorrado, juegos });



console.log( juegos );

// - splice = borramos dependiendo de la posicion.  
// splice(1,2) comenzamos a borrar de la posición uno dos elementos.
let juegosBorrados = juegos.splice( 1, 2);
console.log({ juegosBorrados, juegos });

// saber la posicion ( indice )
let metroidIndex = juegos.indexOf('Metroid'); // CaSeSeNsItIvE
console.log({ metroidIndex });

//TODO: Referencia










