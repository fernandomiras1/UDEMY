import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap, distinct, distinctUntilChanged } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`cell: [${val}]`)),
        // map(([col, row]) => col+row),
        // tap(val => console.log('sum of col + row is:', val)),
        // Si usamos el disitinc no va a emitir el mismo numero.Solo se muestran numeros disitnos
        // distinct()

        // Bloque click Consecutivos.
        distinctUntilChanged( 
            (cell1, cell2)  =>
            // Cuando se cumpla que abmas celdas tengan los mimso valores, estoy
            // devolviendo ture, por lo tanto bloquea el evento
            (cell1[0] == cell2[0]) &&
            (cell1[1] == cell2[1])
        )
    );

    const subscription = click$.subscribe(data => displayLog(data));

    /** end coding */
}