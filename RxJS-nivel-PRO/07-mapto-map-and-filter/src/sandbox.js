import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
// mapTo: Es muy simple, devuelve la salida siempre en el mismo valor
import { mapTo, map, filter, tap, first, take, takeWhile, skip } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        // en este caso devovlemos en el clikc, el string 'click'
        // mapTo('click'),

        // tap:  leer informacion del string de datos y generar acciones
        tap( val => console.log('before', val)),
        map(val => [
            // Math.floor ( me devuele la parte entera sin redondear ).
            Math.floor(val.offsetX / 50),
            Math.floor(val.offsetY / 50 )
        ]),
        // filtro los pares
        // filter( val => ( val[0] + val[1] % 2 != 0)),
        // tap( val => console.log('after', val)),
        
        // first: te permite emitir una sola accion. 
        // a demas le podemos poner logia. Si es mayor a 4 va a imprimir, pero lo hara por
        // unica vez.
        //first(val => val[0] > 3),
        // take: Podemos poner el numero de cuatas veces se va a emimit
        // Se van a emimit 4 veces
        //take(4),
        
        // takeWhile: podemos hacer que se ejecute la accion mietras se cumpla x condicion
        // Mientras que la columna sea mayor a 3, voy a estar emitiendo eventos.
        // takeWhile( ([col, row]) => col > 3),
        
        tap(val => console.log(`cell: [ ${val}]`)),
        
        // Omitir los primeros 5 eventos. despues del 5 ya emite los demas eventos.
        skip(5)

    );
    const subscription = click$.subscribe( event => displayLog(event));


    /** end coding */
}