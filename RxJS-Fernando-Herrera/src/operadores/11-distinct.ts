import { of, from } from 'rxjs';
import { distinct } from 'rxjs/operators';


//distinct:  no emite fluos iguales. si esta repetido no lo emite.

// distinct: sólo va a dejar pasar las emisiones cuyos valores no han sido previamente emitidos 
const numeros$ = of<number|string>(1,'1',1,3,3,2,2,4,4,5,3,1, '1' );

numeros$.pipe(
    distinct() // ===
).subscribe( console.log );

interface Personaje {
    nombre: string;
}

const personajes: Personaje[] = [
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'Zero'
    },
    {
        nombre: 'Dr. Willy'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'Zero'
    },
];

from( personajes ).pipe(
    distinct( p => p.nombre ) // cuando trabajamos con objetos, comparamos con el nombre.
).subscribe( console.log );

// Log...
// {nombre: "Megaman"}
// {nombre: "X"}
// {nombre: "Zero"}
// {nombre: "Dr. Willy"}
