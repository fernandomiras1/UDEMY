import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap, startWith, endWith } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [
            // Math.floor ( me devuele la parte entera sin redondear ).
            Math.floor(val.offsetX / 50),
            Math.floor(val.offsetY / 50 )
        ]),
        // Finalizo los eventos, cuanto toco la columna 0
        takeWhile(([col, row]) => col != 0),
        tap( val => console.log(`cell: [${val}]`)),
        // Podemos agregar eventos al principio del String  y al final del string
        startWith('grid dimensions: ', '10x10'),
        endWith('game finished', 'bye')
    );
    const subscription = click$.subscribe( event => displayLog(event));

    /** end coding */
}