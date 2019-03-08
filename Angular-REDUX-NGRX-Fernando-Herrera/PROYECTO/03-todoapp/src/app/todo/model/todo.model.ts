export class Todo {
    public id: number;
    public texto: string;
    public completado: boolean;

    constructor( texto: string ) {
        // Primer caracter Siempre en Mayuscula
        this.texto = texto.charAt(0).toUpperCase() + texto.slice(1);
        this.completado = false;
        // Id Simulado Por base de datos
        this.id = Math.random();
    }
}
