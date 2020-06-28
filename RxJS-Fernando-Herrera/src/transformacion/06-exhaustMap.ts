import { interval, fromEvent } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';

// El exhaustMap sólo mantiene una suscripción activa antes de poder añadir otra suscripción para que emita los valores.
const interval$ = interval(500).pipe( take(3) );
const click$    = fromEvent( document, 'click' );

click$.pipe(
    exhaustMap( () => interval$ )
)
.subscribe( console.log );


// El exhaustMap es útil cuando nosotros tenemos objetos o elementos que están expandiendo mucho o están lanzando
// muchos eventos rápidamente.

// El exhaustMap es útil cuando tenemos observa bosque emiten muchos valores que nosotros podemos ignorar.
// Por ejemplo que tuviéramos un botón y la persona pusiera muchas muchas veces ese botón o en un formulario
// en el cual hacemos submit con la tecla Enter y la persona presionada enter varias veces que esto podría
// causar los problemas de doble submit entre otras cosas.




