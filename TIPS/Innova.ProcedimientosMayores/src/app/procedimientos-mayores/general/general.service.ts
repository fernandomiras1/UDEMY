import { Injectable } from '@angular/core';
import { AdministradorConfiguracionService } from 'tips.comun';
import { Observable } from 'rxjs/Rx';
import { IRequestCheckPreinduccion, IUpdateChecklistDTO } from '../model/Checklist';
import { HceServicioBase } from '../../common/hce.servicio.base';
import { IActoProcedimentalRequest } from '../model/ActoProcedimental';
import { IUpdateTiempoDTO } from '../model/Tiempos';
import { IBuscarParticipantes, IUpdateParticipante } from '../model/Participantes';

@Injectable()
export class GeneralService {

  configuracion: any;
  constructor(private hceServicioBase: HceServicioBase,
    private adminConfiguracionesService: AdministradorConfiguracionService) { 
    this.configuracion = this.adminConfiguracionesService.getConfiguration();
  }

  private ejecutarPeticion(urlServicio: string, parametrosServicio: any) {
    return this.hceServicioBase.ejecutarConsulta(this.configuracion.procedimientos.urlBackendMayores, urlServicio, parametrosServicio);
  }

   /**
   * Parcticipantes
   */
  obtenerParticipantes(body: IActoProcedimentalRequest) {
    const urlServicio = 'Participantes/ObtenerParticipantes';
    return this.ejecutarPeticion(urlServicio, body);  
  }
  
  actualizarParticipantes(body: IUpdateParticipante) {
    const urlServicio = 'Participantes/ActualizarParticipantes';
    return this.ejecutarPeticion(urlServicio, body);  
  }
  
  buscarParticipantes(body: IBuscarParticipantes) {
    const urlServicio = 'Participantes/BuscarParticipantes';
    return this.ejecutarPeticion(urlServicio, body);  
  }


   /**
   * Checklist
   */
  obtenerChecklistEnActoProcedimental(body: IRequestCheckPreinduccion) {
    const urlServicio = 'Checklist/ObtenerChecklistEnActoProcedimental';
    return this.ejecutarPeticion(urlServicio, body);  
  }

  actualizarChecklistEnActoProcedimental(body: IUpdateChecklistDTO) {
    const urlServicio = 'Checklist/ActualizarChecklistEnActoProcedimental';
    return this.ejecutarPeticion(urlServicio, body);  
  }

   /**
   * Tiempos
   */
  obtenerTiemposEnActoProcedimental(body: IActoProcedimentalRequest) {
    const urlServicio = 'Tiempos/ObtenerTiemposEnActoProcedimental';
    return this.ejecutarPeticion(urlServicio, body);  
  }

  actualizarTiemposEnActoProcedimental(body: IUpdateTiempoDTO) {
    const urlServicio = 'Tiempos/ActualizarTiemposEnActoProcedimental';
    return this.ejecutarPeticion(urlServicio, body);  
  }

}
