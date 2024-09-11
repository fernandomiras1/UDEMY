import { Directive, EventEmitter, 
        ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../model/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }

  // cuando el mouse esta sobre el Drag
  @HostListener('dragover', ['$event']) public onDragEnter( event: any) {
    this.mouseSobre.emit( true );
    this._prevenirDetener( event );
  }
  
  // cuando el mouse se va del Drag
  @HostListener('dragleave', ['$event']) public onDragLeave( event: any) {
    this.mouseSobre.emit( false );
  }

  // cuando se suelta el mouse. Se deja caer la imagen en el Drop
  @HostListener('drop', ['$event']) public onDrop( event: any) {
    
    // Tengo la informacion de los Archivos
    const trasferencia = this._getTrasferencia( event );
    
    if ( !trasferencia ) { 
      return;
    }
    
    this._extraerArchivos( trasferencia.files );
    this._prevenirDetener( event );
    
    this.mouseSobre.emit( false );
  }

  // Es un tema de compatibilidad. Para poder obtener los datos de los archivos soltados.
  // En este caso las imagenes.
  private _getTrasferencia( event: any ) { 
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( archivosLista: FileList ) {
    console.log(archivosLista);

    // Como es un Objeto ( archivoLista ), necesito recorerlo y extraer.
    // separamos el objeto
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista ) ) {
      const archivoTemporal = archivosLista[propiedad];

      if ( this._archivoPuedeSerCargado( archivoTemporal )) {

        const nuevoArchivo = new FileItem( archivoTemporal );
        // Agrego la imagen valida al array personalido
        this.archivos.push( nuevoArchivo );
      } 
    }
  }

  // Validaciones 
  private _archivoPuedeSerCargado( archivo: File): boolean {
    if ( !this._archivoYaFueDroppeado( archivo.name ) && this._esImagen( archivo.type )) {
      return true;
    } else {
      return false;
    }
  }

  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDroppeado( nombreArchivo: string ): boolean {
    for( const archivo of this.archivos ) {
      if ( archivo.nombreArchivo === nombreArchivo ) {
        console.log('El Archivo' +  nombreArchivo + ' ya esta agregado' );
        return true;
      }
    }

    return false;
  }

  private _esImagen ( tipoArchivo: string ): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');
  }

}
