import { interval } from 'rxjs';
import { take, reduce, tap } from 'rxjs/operators';

// reduce en JavaScript Ejemplo 01
const numbers = [1,2,3,4,5];

const totalReducer = ( acumulador: number, valorActual: number ) => {
    return acumulador + valorActual;
}

const total = numbers.reduce( totalReducer, 0 ); // comienza a sumar en 0
console.log('total en JavaScript', total );


// --------------------------- RxJS ------------------------------------------- //
interval(500).pipe(
    take(6), // va a completar el observable despues de completar el numero. en este caso 6.
    tap( console.log ),
    reduce( totalReducer )
)
.subscribe({
    next: val => console.log('next:', val ),
    complete: () => console.log('Complete')
});





