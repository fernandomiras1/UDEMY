import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TipsServicioComun, getErrorMessage, ErrorMessage, AdministradorConfiguracionService } from 'tips.comun';
declare var $;
@Component({
  selector: 'app-doc-plantillas',
  templateUrl: './doc.plantillas.component.html'
})

export class DocPlantillasComponent implements OnInit {

  @Output() onCancelar = new EventEmitter();
  @Input() parametrosAtencion;  
  @Output() onGuardarDocumento = new EventEmitter();
  public verPlantillas: boolean;
  public urlBackendDocumentos: string;

  constructor(private tipsServicioComun: TipsServicioComun,
              private administradorConfiguracionService: AdministradorConfiguracionService) {
      this.urlBackendDocumentos = this.administradorConfiguracionService.getConfiguration().UrlGestionDocumentos;
  }

  ngOnInit() {

  }

  /**
     * Metodo que se ejecuta al desactivar la visualizacion de creacion de documentos
     */
  public desactivarVisualizacionDePlantilla(): void {
    this.verPlantillas = false;
    $('#modal-agregar-documento-plantilla').modal('hide');
  }
  /**
   * Metodo que se ejecuta cuando se guardó exitosamente un documento
   */
  public accionesDeGuardadoDeDocumento(documento): void {
    let doc = {'id':documento.id , 'titulo':documento.titulo};
    
    this.desactivarVisualizacionDePlantilla();
    this.tipsServicioComun.announceNewError(getErrorMessage("success", "El documento se ha guardado correctamente", "", 5));
    this.onGuardarDocumento.emit(doc);
    this.verPlantillas = false;
  }
  /**
  * maneja el evento de error.
  * @param error error item
  */
  public handleOnError(error: ErrorMessage): void {

    // anunciamos el error.
    this.tipsServicioComun.announceNewError(error);
  }

}