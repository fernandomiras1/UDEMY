import { fromEvent } from 'rxjs';
import { first, tap } from 'rxjs/operators';

// first: se completa en la primera subscipcion. sin importar que después tengamos otras emisiones de diferentes valores.

const click$ = fromEvent<MouseEvent>(document, 'click');

click$.pipe( 
    // first(), // termina en el primer click.
    tap(event => console.log('tap', event.clientY)),
    first<MouseEvent>(event => event.clientY >= 150) // se va terminar cuando clientY sea mayor o igual a 150
).subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
})