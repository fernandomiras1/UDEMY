import { fromEvent } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';

// funciona mas bien para los imput
//debounceTime: cuando escribimos en el input despues de 3seg va a emitir el resultado escrito.
const click$ = fromEvent( document, 'click' );

click$.pipe(
    debounceTime(3000)
);//.subscribe( console.log );

// Ejemplo 2
const input = document.createElement('input');
document.querySelector('body').append( input );


const input$ = fromEvent( input, 'keyup' );

input$.pipe(
    debounceTime(1000), // emite despues de 1 seg
    pluck('target','value'), // ibtenemos el value
    distinctUntilChanged() // para que no escriba el mismo valor.
).subscribe( console.log );


