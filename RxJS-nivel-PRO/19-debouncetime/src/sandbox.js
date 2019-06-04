import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

export default () => {
    /** 
     * DEBOUNCE TIME OPERATOR
     * Espera un seg antes de ejecutar la emicion, a demas reinica la espera con cada valor nuevo recibido
     * 
     */
    
    const inputBox = document.getElementById('input-box');

    const inputSrc$ = fromEvent( inputBox, 'input').pipe(
        // Espera de 300 milisegudnos
        debounceTime(300),
        // Emite el evento cuando termino de escribir.
        map(event => event.target.value)
    );

    inputSrc$.subscribe(displayLog);


    /** end coding */
}