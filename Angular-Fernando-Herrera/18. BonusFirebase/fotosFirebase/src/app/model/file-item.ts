export class FileItem {
    
    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public estaSubiendo: boolean;
    public progreso: number;
        // Es obligatodo que tenga un Achivos, por eso lo declaramos en el Contructor.
    constructor( archivo: File ) { 
        // Inicializamos cada una de las propiedades.
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
        this.estaSubiendo = false;
        this.progreso = 0; 
    }
}
