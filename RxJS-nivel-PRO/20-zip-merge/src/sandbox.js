import { updateDisplay, displayLog } from './utils';
import { fromEvent, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export default () => {
    /** 
     * ZIP
     * Convina varios flujos de datos en un unico obsebable que devuele un array con los valores de los obser.
     * de entrada por orden.
     * 
     * MERGE FUNCTION
     * entrelasa los flujos de distinos observables en un unico flujo de dato
     * 
    */

    /** init canvas and context reference  */
    const canvas = document.getElementById('drawboard');
    const ctx = canvas.getContext('2d');

    /** method to draw a line in canvas  */
    const drawLine = (initCoords, endCoords) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(initCoords.x, initCoords.y);
        ctx.lineTo(endCoords.x, endCoords.y);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    /** helper method to retrieve local coords from click */
    const getLocalClickCoords = (event, parent) =>{
        return {
            x: event.clientX - parent.offsetLeft,
            y: event.clientY - parent.offsetTop,
        }
    }

    /** observable from canvas mouse down events */
    const mouseStart$ = fromEvent(canvas, 'mousedown').pipe(
        map(event => {
            return {
                label: 'start',
                coords: getLocalClickCoords(event, canvas)
            }
        }));

    /** observable from canvas mouse up events */
    const mouseEnd$ = fromEvent(canvas, 'mouseup').pipe(
        map(event => {
            return {
                label: 'end',
                coords: getLocalClickCoords(event, canvas)
            }
        }));

    /** observable from canvas mouse move events */
    const mouseMove$ = fromEvent(canvas, 'mousemove').pipe(
        map(event => {
            return {
                label: 'drawing',
                coords: getLocalClickCoords(event, canvas)
            }
        }));        


    //TODO: draw current line

    // usando ZIP 
    const drawLine$ = zip(mouseStart$, mouseEnd$).pipe(
        tap(console.log),
        map(([start, end]) => {
            return {
                origin: start.coords,
                end: end.coords
            }
        })
    )
    
    drawLine$.subscribe(data => drawLine( data.origin, data.end ));
    /** end coding */
}