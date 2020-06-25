import { fromEvent } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

// takeWhile: como su nombre lo dice permite recibir valores mientras la condición se cumpla.

const click$ = fromEvent<MouseEvent>( document, 'click' );


click$.pipe(
    map( ({ x, y }) => ({x,y}) ), // Obtengo del event el x y con estructurin. regresar un objeto que devuelbve x y y
    // takeWhile( ({ y })=> y <= 150 )
    
    takeWhile( ({ y })=> y <= 150, true ) // emitir valor hasta que la y sea menor o igual a 150
)
.subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete'),
});





