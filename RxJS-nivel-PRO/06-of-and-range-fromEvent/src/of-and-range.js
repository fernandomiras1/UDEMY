import { displayLog } from './utils';
import { of, range, interval,timer, zip } from 'rxjs';

export default () => {
    /** start coding */

    // el of , te permite crear una secuencia de datos.
    // de cualquier tipo de dato como esta en el ejemplo soure2
    const soure = of(1,2,3,4,5,6);
    const soure2 = of(
        [1,2,3,4],
        "hola mundo",
        {nombre: 'fer'}
    );
    // te permite crear un rango de secuencia de numeros en este caso
    // esto quiere decir que empiece en 3 y que tenga 10 valores. 
    const soure3 = range(3,10);

    const subscription = soure3.subscribe( dato => displayLog(dato));
    console.log( subscription );
    // const src1 = interval(300);
    // const src2 = "Hello World!";
    // zip(src1, src2).subscribe(x =>displayLog(x[1]));

    /** end coding */
}