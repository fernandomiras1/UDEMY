export class Todo {

    constructor( tarea ) {

        this.tarea  = tarea;
        this.id     = new Date().getTime(); // 1252563852423
        this.completado = false;
        this.creado = new Date(); 
        
    }
}