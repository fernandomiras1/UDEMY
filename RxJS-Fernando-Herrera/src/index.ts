import { fromEvent, of } from 'rxjs';
import { tap, map, mergeMap, pluck, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// Helper
const peticionHttpLogin = ( userPass ) => 
    ajax.post('https://reqres.in/api/login?delay=1', userPass)
        .pipe(
            pluck('response', 'token'),
            catchError( err => of('xxx') )
        )



// creando un formulario
const form = document.createElement('form');
const inputEmail = document.createElement('input');
const inputPass  = document.createElement('input');
const submitBtn  = document.createElement('button');

// Configuraciones
inputEmail.type = 'email';
inputEmail.placeholder = 'Email';
inputEmail.value = 'eve.holt@reqres.in';

inputPass.type = 'password';
inputPass.placeholder = 'Password';
inputPass.value = 'cityslicka';

submitBtn.innerHTML = 'Ingresar';

form.append( inputEmail, inputPass, submitBtn );
document.querySelector('body').append( form );

// Streams
const submitForm$ = fromEvent<Event>( form, 'submit' )
    .pipe(
        tap( ev => ev.preventDefault() ), // no modifica el flujo de informacion
        map( ev => ({ // la salida va a ser un objeto con emial y pass
            email: ev.target[0].value,
            password: ev.target[1].value
        })), 
        // mergeMap( peticionHttpLogin )
        // mergeMap: Si yo hago clic varias veces digamos que presiono 5 clics uno dos tres cuatro cinco. Noten que las cinco peticiones se disparan. Pero las 5 peticiones se realizaron. 
        
        // switchMap( peticionHttpLogin )
        // switchMap: Si yo hago clic varias veces digamos que presiono 5 clics uno dos tres cuatro cinco. Noten que va a cancelar cualquier otra suscripción que esté pendiente dentro del switch Map y sólo regresa la última.
       
        exhaustMap( peticionHttpLogin )
        // exhaustMap: Si yo hago clic varias veces digamos que presiono 5 clics uno dos tres cuatro cinco. Noten que solo una  petición fue la que se disparó y aunque yo presione cinco veces 'enter' 
        // cuando llegó al exhaustMap ahí empezó a ignorar todas las peticiones después de la primera.
    );


submitForm$.subscribe( token => {
    console.log(token);
})
