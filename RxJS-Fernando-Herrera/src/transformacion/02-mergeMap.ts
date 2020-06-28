import { of, interval, fromEvent } from 'rxjs';
import { mergeMap, take, map, takeUntil } from 'rxjs/operators';



const letras$ = of('a', 'b', 'c');

// mergeMap: va a recibir el valor que sea emitido de nuestro observador inicial y está regresando un nuevo observador ustedes pueden ver Regreso un intervalo de milisegundos es decir
// regresa un nuevo observable
letras$.pipe(
    mergeMap( (letra) => interval(1000).pipe(
        map( i => letra + i ), 
        take(3)
    ))
)
// .subscribe({
//     next: val => console.log('next:', val),
//     complete: () => console.log('Complete')
// });


const mousedown$ = fromEvent( document, 'mousedown');
const mouseup$   = fromEvent( document, 'mouseup');
const interval$  = interval();

mousedown$.pipe(
    mergeMap( () => interval$.pipe(
        takeUntil( mouseup$ ) // cuando se suelta el click del mouse. termina el interval.
    ))
)
.subscribe( console.log );