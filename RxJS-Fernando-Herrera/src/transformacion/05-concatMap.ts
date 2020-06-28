import { interval, fromEvent } from 'rxjs';
import { take, switchMap, concatMap } from 'rxjs/operators';

// concatMap nos sirve para concatenar los observador resultantes que pueden fluir a través de ese operador.
// es decir que hasta que no se termine el observer, no pasa al sigueitne, lo pone en una cola

const interval$ = interval(500).pipe( take(3) );

// Si yo lo presiono tres veces el click
// Entonces con concatMap vas a ver cuál fue el primero observa volver a entrar cuál fue el siguiente y
// cuál fue el último y los va a ejecutar en secuencia. Los va a concatenar uno después del otro.
const click$    = fromEvent( document, 'click' );

click$.pipe(
    concatMap( () => interval$ )
)
.subscribe( console.log );