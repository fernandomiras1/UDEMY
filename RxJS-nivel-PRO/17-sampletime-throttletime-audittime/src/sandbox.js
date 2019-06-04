import { updateDisplay } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap, sampleTime } from 'rxjs/operators';

export default () => {
    /** 
     * SAMPLE TIME OPERATOR
     * Emite el valor mas reciente de un flujo de datos cada cierto tiempo, siempre y cuado,
     * alla emitido algun valor en el intervalo.
     * 
     * 
     * 
     * 
     * start coding */
    
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    //function to update progress bar width on view
    const updateProgressBar = (percentage) => {
        progressBar.style.width = `${percentage}%`;
    }

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
        tap(evt => console.log('[scroll event]')),
        sampleTime(50),
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt))
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