import { updateDisplay } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap, pairwise } from 'rxjs/operators';
/**
En este ejemplo queremos saber si el scroll se esta haciedno para abajo o para arriba, 
pero el obserbable emite un solo valor, necesitaria al menos dos valores, el valor actual y el vaor anterior, 
para saber si el scroll esta aumentando o disminuyendo. 
Para eso usamos el operador pairwise

pairwise: Se encarga de emitir los eventos en pareja de datos consecutivos, de este modo podes trabajar sobre el datos
actual y el anterior.
pairwise te permite acceder al evento anterir, si neceidad de utilizar ninguna variable externa.
*/

export default () => {
    /** start coding */
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;
    const updateProgressBar = (percentage) => {
        progressBar.style.width = `${percentage}%`;
    }

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt)),
        pairwise(),
        // Devuelve un array con los valores anterior y el actual
        tap(([previous, current]) => {
            updateDisplay( current > previous ? 'DESC' : 'ASC' );
        }),
        // Como es un array, devolvemos el current ( el valor actual )
        map(([previous, current]) => current)
    );

    //observable that returns the amount of page scroll progress
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        })
    )

    //subscribe to scroll progress to paint a progress bar
    const subscription = scrollProgress$.subscribe(updateProgressBar);

    /** end coding */
}