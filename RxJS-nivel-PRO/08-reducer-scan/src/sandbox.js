import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap, reduce, scan } from 'rxjs/operators';

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
        // reduce: aplica una misma funcion a cada evento que llega por el stirng de forma secuencial.
        // scan: se parece al reduce, apilica un acumulador al flujo de eventos, 
        // pero la diferencia es que cada vez que reciebe un evetno, scan emite un evento con el valor acumulado 
        
        
        
        // Espera una funcion el reduce
        // accumulated: tiene el valor acumulado
        // current: representa el valor actualr
        scan( (accumulated, current) => {
            // El acumulador me devuela en nro Click acumulados y un array con 
            // las casillas validas clickeadas.
            return {
                clicks: accumulated.clicks + 1,
                cells: [ ...accumulated.cells, current]
            }
        }, { clicks: 0, cells: []})
    );
    const subscription = click$.subscribe( event => 
        displayLog(`${event.clicks} clicks: ${JSON.stringify(event.cells)}` ));

    /** end coding */

    const button = document.getElementById('btn');
    /** get comments on button click */
    fromEvent(button, 'click').pipe(
        // utlizo la funcion scan, para emitir un contador
        scan((acc, evt) => acc + 1, 0),            
        tap(console.log),
    ).subscribe(displayLog);

}