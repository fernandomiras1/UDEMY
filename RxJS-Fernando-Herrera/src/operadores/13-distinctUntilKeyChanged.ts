import { from } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';

// distinctUntilKeyChanged: emite valores siempre y cuando la emisión anterior no sea la misma. 
// Con la diferencia que trabaja con objetos

// ver el diagrama de canicas es mas facil de entender. 
// {k:1} - {k:2} - {k:2} - {k:1} - {k:3} - {k:2} ---
// ------------------------------------------------
// {k:1} - {k:2}           {k:1} - {k:3}  - {k:2} 

interface Personaje {
    nombre: string;
}

const personajes: Personaje[] = [
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'Megaman'
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
        nombre: 'X'
    },
    {
        nombre: 'Zero'
    },
];

from( personajes ).pipe(
    distinctUntilKeyChanged('nombre') // el nombre de la propiedad que tengo que mandar del obejto.
).subscribe( console.log );



