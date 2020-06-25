import { interval, fromEvent } from 'rxjs';
import { sample } from 'rxjs/operators';


// el operador sample emite el último valor emitido por El Observador
// hasta que el otro observa lo que tenemos dentro del operador sample emita un valor.

const interval$ = interval(500);
const click$    = fromEvent( document, 'click' );



interval$.pipe(
    sample(click$)
).subscribe( console.log );