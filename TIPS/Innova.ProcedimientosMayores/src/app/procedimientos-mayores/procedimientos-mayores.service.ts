import { Injectable } from '@angular/core';
import { HceServicioBase } from '../common/hce.servicio.base';
import { AdministradorConfiguracionService } from 'tips.comun';
import { Observable } from 'rxjs/Rx';
import { ICambiarEstadoDeItemRequest } from './model/ActoProcedimental';

@Injectable()
export class ProcedimientosMayoresService {

  configuracion: any;
  constructor(private hceServicioBase: HceServicioBase,
    private adminConfiguracionesService: AdministradorConfiguracionService) { 
    this.configuracion = this.adminConfiguracionesService.getConfiguration();
  }

  private ejecutarPeticion(urlServicio: string, parametrosServicio: any) {
    return this.hceServicioBase.ejecutarConsulta(this.configuracion.procedimientos.urlBackendMayores, urlServicio, parametrosServicio);
  }

  inicializarActoProcedimental(idActoProcedimental: number) {
    const urlServicio = 'Inicializar/InicializarActoProcedimental';
    return this.ejecutarPeticion(urlServicio, {"IdActoProcedimental": idActoProcedimental});    
  }

  cambiarEstadoDeItem(body: ICambiarEstadoDeItemRequest) {
    const urlServicio = 'CambioDeEstados/CambiarEstadoDeItem';
    return this.ejecutarPeticion(urlServicio, body);    
  }

   /**
   * Impresion De Documentos
   */
  impresionDeDocumentos(idDocumento: number) {
    const urlServicio = 'ImpresionDeDocumentos/ObtenerReporteDeDocumento';
    return this.ejecutarPeticion(urlServicio, {'IdDocumento': idDocumento});  
  }

}