import { fromEvent, merge } from 'rxjs';
import { pluck } from 'rxjs/operators';

// merge: es otra función que recibe uno o más observamos y el resultado va a ser el producto de ambos observamos combinados simultáneamente.
const keyup$ = fromEvent( document, 'keyup');
const click$ = fromEvent( document, 'click');

// Y de esta manera ustedes pueden tomar dos o más observamos y combinarlos juntos la salida o el producto
// de este merge es la combinación de ambas emisiones.
merge( 
    keyup$.pipe( pluck('type') ), 
    click$.pipe( pluck('type') )
).subscribe( console.log );


