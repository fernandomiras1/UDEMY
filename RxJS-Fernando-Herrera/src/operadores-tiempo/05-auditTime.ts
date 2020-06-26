import { fromEvent } from 'rxjs';
import { auditTime, tap, map } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>( document, 'click');
// el auditTime lo que hace es emitir el último valor que ha sido emitido por él observado

// en un periodo de tiempo determinado.


click$.pipe(
    map( ({ x }) => x ),
    tap(val => console.log('tap', val) ),
    auditTime(5000) // cuenta 5 seg antes de terminar la subscipcion. Emitiendo el ultimo valor
).subscribe( console.log );


// Log haciendo varios click...
// tap 10
// tap 46
// tap 133
// tap 201
// tap 316
// tap 407
// Subscriber.js:192 407