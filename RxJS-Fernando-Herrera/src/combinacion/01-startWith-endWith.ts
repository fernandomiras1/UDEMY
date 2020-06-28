import { of } from 'rxjs';
import { startWith, endWith } from 'rxjs/operators';



const numeros$ = of(1,2,3).pipe(
    startWith('a','b','c'), // especificamos con que queres que empieze la emision. podemos enviar cualquier argumento y siempre va a comnezar la emiasion
    endWith('x','y','z'), // especificamos con que queres que termine la emision.
);



numeros$.subscribe( console.log );

// Log...
// a
// b
// c
// 1
// 2
// 3
// x
// y
// z


