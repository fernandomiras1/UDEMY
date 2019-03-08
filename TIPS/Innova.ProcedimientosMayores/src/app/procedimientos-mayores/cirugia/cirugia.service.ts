import { Injectable } from '@angular/core';
import { HceServicioBase } from '../../common/hce.servicio.base';
import { AdministradorConfiguracionService } from 'tips.comun';
import { IActoProcedimentalRequest } from '../model/ActoProcedimental';
import { IUpdateNotaDTO } from '../model/NotaPreoperatoria';
import { Observable } from 'rxjs/Rx';
import { IObtenerFojaQuirurgicaRequest, IUpdateFojaDTO } from '../model/FojaQuirurgica';
import { IUpdateProcedimiento } from '../model/Procedimiento';

@Injectable()
export class CirugiaService {

  configuracion: any;
  constructor(private hceServicioBase: HceServicioBase,
    private adminConfiguracionesService: AdministradorConfiguracionService) { 
    this.configuracion = this.adminConfiguracionesService.getConfiguration();
  }

  private ejecutarPeticion(urlServicio: string, parametrosServicio: any) {
    return this.hceServicioBase.ejecutarConsulta(this.configuracion.procedimientos.urlBackendMayores, urlServicio, parametrosServicio);
  }

   /**
   * Nota Preoperatoria
   */
  obtenerNotaPreoperatoria(body: IActoProcedimentalRequest) {
    const urlServicio = 'NotaPreoperatoria/ObtenerNotaPreoperatoria';
    return this.ejecutarPeticion(urlServicio, body);  
  }
  
  actualizarNotaPreoperatoria(body: IUpdateNotaDTO) {
    const urlServicio = 'NotaPreoperatoria/ActualizarNotaPreoperatoria';
    return this.ejecutarPeticion(urlServicio, body);  
  }

   /**
   * Foja Quirúrgica 
   */
  obtenerFojaQuirurgica(body: IObtenerFojaQuirurgicaRequest) {
    const urlServicio = 'FojaQuirurgica/ObtenerFojaQuirurgica';
    return this.ejecutarPeticion(urlServicio, body);  
  }

  actualizarFojaQuirurgica(body: IUpdateFojaDTO) {
    const urlServicio = 'FojaQuirurgica/ActualizarFojaQuirurgica';
    return this.ejecutarPeticion(urlServicio, body);  
  }

   /**
   * Procedimientos
   */
  obtenerProcedimientos(body: IActoProcedimentalRequest) {
    const urlServicio = 'Procedimientos/ObtenerProcedimientos';
    return this.ejecutarPeticion(urlServicio, body);  
  }

  actualizarProcedimientos(body: IUpdateProcedimiento) {
    const urlServicio = 'Procedimientos/ActualizarProcedimientos';
    return this.ejecutarPeticion(urlServicio, body);  
  }


}
