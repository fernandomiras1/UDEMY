import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent } from 'rxjs';
import { map, scan, tap, mergeMap, switchMap, concatMap } from 'rxjs/operators';

export default () => {
    /** 
     * switchMap
     *  sirve cuando te queres quedar con la ultima peticion, el ultimo subcripcion.
     *  recibo el ultimo emit ( sub ) que hice.
     * 
     * concatMap
     * recibimos todas las peticiones del srv, se subscribe a los observables de forma ordenada.
     * Hasta que no se completen los primeros observables internos, no va a continuar con el siguiente.
     */
    
    const button = document.getElementById('btn');
    fromEvent(button, 'click').pipe(
        // utlizo la funcion scan, para emitir un contador
        scan((acc, evt) => acc + 1, 0),
        // id: es el contador del count click del btn         
        switchMap(id => api.getComment(id)),
        // recibimos todas las peticiones del srv, pero en forma ordenada.
        //concatMap(id => api.getComment(id)),
        map(JSON.stringify),
        tap(console.log),
    ).subscribe(displayLog);

    /** end coding */
}