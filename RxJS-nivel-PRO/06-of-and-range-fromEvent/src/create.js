import { displayLog } from './utils';
import { fromEvent } from 'rxjs';

export default () => {
    /** start coding */

    const actionBtn = document.getElementById('action-btn');

    // Obtiene los eventos de tipo Click.
    const source = fromEvent( actionBtn, 'click' );
 
    // Se subscribe a los eventosClick.
    source.subscribe( event => {
        displayLog(`click event at pos (${event.x}), (${event.y})`);
    });

    const eventDocument = fromEvent( document, 'mousemove');
    eventDocument.subscribe( event => {
        console.log(event);
    });

    // hago lo mismo con javaScript
    // document.addEventListener( 'mousemove', event => {
    //     console.log(event);
    // });

    /** end coding */
}