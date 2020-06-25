import { interval, fromEvent } from 'rxjs';
import { takeUntil, skip, tap } from 'rxjs/operators';

// takeUntil: Básicamente esto lo que podemos hacer con el takeUntil, que pocas palabras nos permite a nosotros
// estar emitiendo los valores hasta que otro emita su primer valor.


// skip: Es bastante sencillo y básicamente me sirve a mí para saltar o bien omitir x cantidad de emisiones iniciales.
const boton = document.createElement('button');
boton.innerHTML = 'Detener Timer';

document.querySelector('body').append( boton );


const counter$  = interval(1000); // cada 1 seg va a estar emitiendo 

// const clickBtn$ = fromEvent( boton, 'click' );
const clickBtn$ = fromEvent( boton, 'click' ).pipe(
    tap( () => console.log('tap antes de skip') ),
    // cuantas emiciones de este evento quiero saltarme , en este caso una. Porque a la seg va a emitir valor y se completa-
    skip(1), // Cerramos la subscipcion cuando hacemos click dos veces
    tap( () => console.log('tap después de skip') ),
)

counter$.pipe(
    takeUntil( clickBtn$ )
).subscribe({
        next: val => console.log('next', val),
        complete: () => console.log('complete')
});











