import { fromEvent } from 'rxjs';
import { map, sampleTime } from 'rxjs/operators';


// sampleTime: nos permite a nosotros obtener el último valor emitido en un intervalo de tiempo.

// -------------- En OTRAS PALABRAS ----------
// El sampleTime nos permite a nosotros tener una suscripción que está pendiente

// de cada una de sus emisiones en periodos de tiempo.

// Básicamente hagamos un ejemplo para que esto quede más claro

const click$ = fromEvent<MouseEvent>( document, 'click');


click$.pipe(
    sampleTime(2000), // cuanto te subribis va a empezar a contar 2 seg. el ultimo valor emitido
    map( ({ x, y }) => ({ x, y }) ),
).subscribe( console.log );






