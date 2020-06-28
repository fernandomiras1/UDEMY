import { interval, concat, of } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';

const interval$ = interval(1000);

// concat: Crea un Observable de salida que emite secuencialmente todos los valores de un Observable dado y luego pasa al siguiente.

concat(
    interval$.pipe( take(3) ), //hasta que no termine la subrcicpion no pasa al sigueinte.
    interval$.pipe( take(2) ),
    of(1)
).subscribe( console.log  )


// Log... 
// 0 
// 1
// 2
// 0
// 1
// 1