import { fromEvent } from 'rxjs';
import { auditTime, tap, map } from 'rxjs/operators';

// el auditTime lo que hace es emitir el último valor que ha sido emitido por él observado

// en un periodo de tiempo determinado.


const click$ = fromEvent<MouseEvent>( document, 'click');



click$.pipe(
    map( ({ x }) => x ),
    tap(val => console.log('tap', val) ),
    auditTime(5000)
).subscribe( console.log );