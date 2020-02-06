/** this con Explicit binding */

function persona(el1, el2) {
    console.log(`Hola soy ${this.nombre} y me gusta el ${el1} y ${el2} `);
}
const informacion = {
    nombre: 'Juan',
    trabajo: 'Programador'
}
const generosMusicales = ['Heavy Metal', 'Rock'];

// Explicit binding con call, cuando pasas arreglo debes colocar todas las posiciones
persona.call(informacion, generosMusicales[0], generosMusicales[1]);

// explicit binding con .apply, ( si toma un arreglo )
persona.apply(informacion, generosMusicales);

// explicit binding .bind
const nuevaFn = persona.bind(informacion, generosMusicales[0], generosMusicales[1]);
nuevaFn();