import { of } from 'rxjs';

// of: Es una función que nos permite a nosotros crear observables
// en base a un listado de elementos.

// el operador o va a emitir los valores en secuencia uno por uno de manera síncrona y cuando ya emite el último valor automáticamente se completa el observable.

// const obs$ = of(1,2,3,4,5,6);
const obs$ = of<number>(...[1,2,3,4,5,6],2,3,4,5);
// const obs$ = of( [1,2], {a:1, b:2}, function(){}, true, Promise.resolve(true) );


console.log('Inicio del Obs$');
obs$.subscribe( 
    next => console.log('next', next ),
    null,
    () => console.log('Terminamos la secuencia')
);
console.log('Fin del Obs$');


