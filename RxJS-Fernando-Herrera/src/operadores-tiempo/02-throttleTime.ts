import { fromEvent, asyncScheduler } from 'rxjs';
import { throttleTime, pluck, distinctUntilChanged } from 'rxjs/operators';


const click$ = fromEvent( document, 'click' );

click$.pipe(
    throttleTime(3000)
)//.subscribe( console.log );

// Ejemplo 2
const input = document.createElement('input');
document.querySelector('body').append( input );


const input$ = fromEvent( input, 'keyup' );

input$.pipe(
    throttleTime(400, asyncScheduler, { // va a emitir si o si en 4 mil seg
        leading: false, //primer elemento
        trailing: true  // ultimo elemento
    }),
    pluck('target','value'),
    distinctUntilChanged()
).subscribe( console.log );










