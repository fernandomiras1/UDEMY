import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { concat, forkJoin, fromEvent, of } from 'rxjs';
import { map, endWith, merge } from 'rxjs/operators';

export default () => {
    /** start coding */
    
    const button = document.getElementById('btn');

    /** get 4 consecutive comments */
    const getComments = () =>{
        //son  tres apis, alatorias, sumulando una REST API.
        const comment1$ = api.getComment(1);
        const comment2$ = api.getComment(2);
        const comment3$ = api.getComment(3);
        const comment4$ = api.getComment(4);

        //subscribe to all the observables to get and display comments
        /**
         *  merge: agurpa los observables en un array.
         *  concat: agurpa obserbables ( en tiempo aleatorio). Emite un conjunto de observables en orden 
                    los ejecuta en forma secuencial, cuando se complete el primero, recien ahi va al segundo observ.
         
            forkJoin: espera que se terminen todo para luego ejecutar el evento. 
         
        */

        // concat(comment1$, comment2$, comment3$, comment4$).pipe(
        //     map(({id, comment}) => `#${id} - ${comment}`),
        //     endWith('--------//--------')
        // ).subscribe(data =>{
        //     displayLog(data);
        // })
       
        // merge(comment1$, comment2$, comment3$, comment4$).pipe(
        //     map(({id, comment}) => `#${id} - ${comment}`),
        //     endWith('--------//--------')
        // ).subscribe(data =>{
        //     displayLog(data);
        // })
        
        forkJoin(comment1$, comment2$, comment3$, comment4$).pipe(
            map(JSON.stringify),
            endWith('--------//--------')
        ).subscribe(data =>{
            displayLog(data);
        })
    }

    /** get comments on button click */
    fromEvent(button, 'click').subscribe(getComments);

    /** end coding */
}