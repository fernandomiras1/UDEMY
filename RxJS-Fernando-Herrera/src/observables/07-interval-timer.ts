import { interval, timer } from 'rxjs';

// interval: crea un observable que emite una secuencia de números en un intervalo de tiempo especificado. Comenzando en 0

// timer: ejecutamos esta función timer 2000 milisegundos. Lo que estamos diciendo es que después de dos segundos va a emitir el primer valor y se va a completar
const observer = {
    next: val => console.log('next:', val),
    complete: () => console.log('complete'),
}

const hoyEn5 = new Date(); // ahora
hoyEn5.setSeconds( hoyEn5.getSeconds() + 5 );


const interval$ = interval(1000);

// const timer$    = timer(2000);
// const timer$    = timer(2000, 1000 );
const timer$    = timer( hoyEn5 );


console.log('Inicio');
// interval$.subscribe( observer );
timer$.subscribe( observer )
console.log('Fin');



