
import { asyncScheduler } from 'rxjs';

// basicamente podemos hacer estas mismas funciones con el asyncScheduler
// setTimeout (() => {}, 3000);
// setInterval(() => {}, 3000);

const saludar  = () => console.log('Hola Mundo');
const saludar2 = nombre => console.log(`Hola ${ nombre }`);

// asyncScheduler.schedule( saludar, 2000 ); setTimeout
// asyncScheduler.schedule( saludar2, 2000, 'Fernando' ); // mandamos el argumento

// schedule: espera recivbir la funcion que nosotros queremos ejecutar y el otro el tiempo para que se ejecute
// setInterval en asyncScheduler
 const subs = asyncScheduler.schedule( function(state){

    console.log('state', state);

    this.schedule( state + 1, 1000 );
    
}, 3000, 0 );



// setTimeout( () => {
//     subs.unsubscribe();
// }, 6000);

// esto es lo mismo. rompemos la subcripcion a los 6 seg
asyncScheduler.schedule( ()=> subs.unsubscribe(), 6000 );









