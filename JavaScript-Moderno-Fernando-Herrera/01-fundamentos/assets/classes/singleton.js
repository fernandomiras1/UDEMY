// Singleton: es una instacia unica de mi clase 
class Singleton {

    static instancia; // undefined
    nombre = '';

    constructor( nombre = '' ) {
        // comprobamos si no existe. trabajamos con el valor boleano cuando es undefinded. equivale a false
        if ( !!Singleton.instancia ) {
            // si existe una instancia devolvemos esa misa intancia. 
            return Singleton.instancia;
        }

        Singleton.instancia = this;
        this.nombre = nombre;
    }

}

const instancia1 = new Singleton('Ironman');
const instancia2 = new Singleton('Spiderman');
const instancia3 = new Singleton('BlackPanther');


console.log(`Nombre en la instancia1 es: ${ instancia1.nombre }`);
console.log(`Nombre en la instancia2 es: ${ instancia2.nombre }`);
console.log(`Nombre en la instancia3 es: ${ instancia3.nombre }`);

