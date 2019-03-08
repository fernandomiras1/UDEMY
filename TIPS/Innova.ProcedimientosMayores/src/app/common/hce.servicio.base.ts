import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { HttpClient, TipsServicioComun, getErrorMessage } from 'tips.comun';

@Injectable()
export class HceServicioBase {

  verMensaje: boolean = false;

  constructor(private httpClient: HttpClient, private errorService: TipsServicioComun) {
  }

  ejecutarConsulta(BackEnd: string, URL: string, parametros?: any, verMensaje: boolean = false, verSpinner : boolean = true) {
    this.verMensaje = verMensaje;
    let self = this;
    return this.httpClient.post(BackEnd + URL, parametros || {}, verSpinner)
      .catch (err => this.handleError(err, self))
      .do((res) => { this.procesarRespuesta(res, self); },
          (error) => { this.procesarRespuesta(error, self); }
      );
  }

  private handleError(error, self) {
    self.respuestaConError('Se ha producido un error al realizar la consulta.', self);
    return Observable.throw(error)
  }

  private procesarRespuesta(error:any, self){
    if(!error.Codigo){
      error.Codigo = error.status
    }
    switch(error.Codigo){
      case 0:
        self.respuestaSatisfactoria(error, self);
        break;
      case 200:
        self.respuestaSatisfactoria(error, self);
        break;
      case 201:
        break; // Requiere confirmacion, lo maneja el componente que lo peticiona
      case 202:
        self.respuestaConErrorValidacion(error, self);
        break;
      case 401:
        self.respuestaConErrorAutorizacion(error, self);
        break;
      case 404:
        self.respuestaConError('Se ha producido un error. Servicio no encontrado', self);
        break;
      case 500:
        self.respuestaConError('Se ha producido un error al realizar la consulta.', self);
        break;
      default:
        break;
    }
  }

  private respuestaSatisfactoria(response, self){
    if(response.Codigo == 200 && response.Mensaje && this.verMensaje)
      self.errorService.announceNewInternalError(getErrorMessage("success", response.Mensaje, "", 5 ));
  }

  private respuestaConErrorValidacion(error, self){
    if(error.MensajesValidacion){
      let apiMessage = '';
      error.MensajesValidacion.forEach(mensaje => { apiMessage += mensaje.Mensaje + '\n'; });
      self.errorService.announceNewInternalError(getErrorMessage("error", apiMessage, "", 7));
    }else{
      self.errorService.announceNewInternalError(getErrorMessage("error", error.Mensaje, "", 7));
    }
  }

  private respuestaConErrorAutorizacion(error, self){
    self.errorService.announceNewInternalError(getErrorMessage("error", 'No posee permisos para procesar la consulta', "", 7));
  }

  private respuestaConError(mensaje =  'Ha ocurrido un error', self){
    self.errorService.announceNewInternalError(getErrorMessage("error", mensaje, "", 7));
  }

}
