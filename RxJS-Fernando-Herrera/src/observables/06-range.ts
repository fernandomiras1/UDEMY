import { of, range, asyncScheduler } from 'rxjs';


// const src$ = of(1,2,3,4,5);
// crear emite valores numeros consecutrivos

// range: nos crea un observable que emite una secuencia de números en
// base a un rango o una secuencia de números en base a un rango.


// asyncScheduler: nos sirve para trasforma de manera asincrona
const src$ = range(1,5, asyncScheduler);


console.log('inicio');
src$.subscribe( console.log );
console.log('fin');


