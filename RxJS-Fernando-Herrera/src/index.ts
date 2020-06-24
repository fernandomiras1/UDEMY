import { range, fromEvent } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';

// range(1,5).pipe(
//     map<number,string>( val => (val * 10).toString() )
// )
// .subscribe( console.log );

const keyup$ = fromEvent<KeyboardEvent>( document, 'keyup' );

const keyupCode$ = keyup$.pipe(
    map( event => event.code )
);
// obtenemos directamente la propiedad que tiene el target en baseURI
const keyupPluck$ = keyup$.pipe(
    pluck('target', 'baseURI')
);

// me trasforma la salia en lo que necesite
const keyupMapTo$ = keyup$.pipe(
    mapTo('Tecla presionada')
);


keyup$.subscribe( console.log );
keyupCode$.subscribe( code => console.log('map', code ) );
keyupPluck$.subscribe( code => console.log('pluck', code ) );
keyupMapTo$.subscribe( code => console.log('mapTo', code ) );

