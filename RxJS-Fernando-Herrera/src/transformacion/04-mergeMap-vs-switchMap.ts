import { fromEvent, interval } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';



// switchMap: sólo mantiene una suscripción interna activa mientras que el mergeMap puede mantener todas

// las que ustedes necesiten o todas las que ustedes quieran activar simultáneamente corriendo.

const click$    = fromEvent( document, 'click' );
const interval$ = interval(1000);


click$.pipe(
    switchMap( () => interval$ ),
    // mergeMap( () => interval$ ),
).subscribe( console.log );


