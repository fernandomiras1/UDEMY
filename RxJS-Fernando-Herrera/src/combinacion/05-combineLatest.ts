import { fromEvent, combineLatest, from } from 'rxjs';
import { pluck } from 'rxjs/operators';

// const keyup$ = fromEvent( document, 'keyup');
// const click$ = fromEvent( document, 'click');

// combineLatest( 
//     keyup$.pipe( pluck('type') ), 
//     click$.pipe( pluck('type') )
// ).subscribe( console.log );


// combineLatest: Combina múltiples observables para crear un observable cuyos valores se calculan a partir de los últimos valores de cada uno de sus observables de entrada.

const input1 = document.createElement('input');
const input2 = document.createElement('input');

input1.placeholder = 'email@gmail.com';
input2.placeholder = '*********';
input2.type = 'password'

document.querySelector('body').append(input1, input2);


// Helper
const getInputStream = ( elem: HTMLElement ) => 
    fromEvent<KeyboardEvent>( elem, 'keyup' ).pipe(
        pluck<KeyboardEvent,string>('target','value'));


combineLatest(
    getInputStream( input1 ), // email
    getInputStream( input2 ), // pass
).subscribe( console.log ) // emite ambos valores con su ultima emicion. 

// log...
// (2) ["fer", "f"]
// (2) ["fer", "fe"]
// (2) ["fer", "fer"]
// (2) ["fer", "fer1"]
// (2) ["fer", "fer12"]
