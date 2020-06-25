import { of, from } from 'rxjs';
import { distinct, distinctUntilChanged } from 'rxjs/operators';


// distinctUntilChanged: emite valores siempre y cuando la emisión anterior no sea la misma

// ver el diagrama de canicas es mas facil de entender. 
// 1 - 2 - 2- 1 - 3- 2 ---
// -----------------------
// 1 - 2      1 - 3 - 2 

const numeros$ = of<number|string>(1,'1',1,3,3,2,2,4,4,5,3,1, '1' );

numeros$.pipe(
    distinctUntilChanged()
).subscribe( console.log );

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
    distinctUntilChanged( (ant, act) => ant.nombre === act.nombre )
).subscribe( console.log );