import { updateDisplay } from './utils';
import { fromEvent, Subject, BehaviorSubject } from 'rxjs';
import { map, tap, share } from 'rxjs/operators';

export default () => {
    /** start coding */

    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    //function to update progress bar width on view
    const updateProgressBar = (percentage) => {
        progressBar.style.width = `${percentage}%`;
    }

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
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

    // Creamos nuestro BehaviorSubject ya que lo tenemos q inicializar en 0
    const scrollProgressHot$ = new BehaviorSubject(0);
    // Me subscribo al evento scroll. Por unica vez, tiene una sola subscripcion.
    scrollProgress$.subscribe( scrollProgressHot$ );

    //Como scrollProgressHot es un Subjet, me puedo subcribir. de esta manera tiene mas de una subcripcion
    const subscription = scrollProgressHot$.subscribe(updateProgressBar);
    const subscription2 = scrollProgressHot$.subscribe(
        val => updateDisplay(`${ Math.floor(val) } %`)
    );
    
    /**
       Como el scrollProgressHot es un Subjet, no solo me 
       sirve como distribuidor de eventos si no tambien me permite emitir sus propos eventos.
       Como tambien es un Observable puedo emitir un evento,
       con el next. por lo cual emito que inicie con el porcentaje 0 
     */
    // scrollProgressHot$.next(0);

    console.log("scroll initial state: ", scrollProgressHot$.value);

    /** end coding */
}