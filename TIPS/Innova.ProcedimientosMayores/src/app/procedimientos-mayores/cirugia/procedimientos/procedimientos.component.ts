import { Component, OnInit, OnDestroy } from '@angular/core';
import { CirugiaService } from '../cirugia.service';
import { AppService } from '../../../common/app.service';
import { CrudBaseComponent } from '../../CrudBaseComponent';
import { IActoProcedimentalRequest } from '../../model/ActoProcedimental';
import { ProcedimientoDTO, Procedimiento, IUpdateProcedimiento } from '../../model/Procedimiento';
import { TipsServicioComun, getErrorMessage } from 'tips.comun';

@Component({
  selector: 'app-procedimientos',
  templateUrl: './procedimientos.component.html',
  styles: []
})
export class ProcedimientosComponent extends CrudBaseComponent implements OnInit, OnDestroy {
  
  idActoProcedimentalRequest: IActoProcedimentalRequest;
  procedimientoDTO: ProcedimientoDTO;
  updateProcedimiento: IUpdateProcedimiento;
  public procedimientoPrincipal: Array<any> = new Array<any>();
  public addPlantilla: boolean;
  public isActive: boolean = null;

  public paramsProcedimiento = {
    IdDominioDeTerminologia: 128
  };

  constructor(private cirugiaService: CirugiaService,
    private tipsServicioComun: TipsServicioComun,
    private appService: AppService ) { super(); }

  ngOnInit() {
    this.obtenerProcedimientos();
    this.subscribeToEvents();
  }

  private subscribeToEvents(): void {
    this.eventSubscriptions.push(this.appService.btnGuardarClickeadoEvent.subscribe(() => {
        this.guardarProcedimiento();
      }));
  }

  private obtenerProcedimientos(): void {
    this.idActoProcedimentalRequest = {
      IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental
    }

    this.cirugiaService.obtenerProcedimientos( this.idActoProcedimentalRequest ).subscribe((resu: ProcedimientoDTO) => {
      this.procedimientoDTO = resu;
    });

  }
  
  public agregarProcedimineto(): void {
  
    if (this.procedimientoPrincipal.length == 0) {
      this.tipsServicioComun.announceNewInternalError(getErrorMessage("error", "Ingrese el Procedimiento", "", 7));
      return;
    }

    if( this.isActive == null ) return;
     
    // Agregamos el Nuevo Procedimineto al Array
    let arrayNuevo: Procedimiento = {
      IdProcedimientoEnActo: 0,
      IdTermino: this.procedimientoPrincipal[0].IdTermino,
      NombreProcedimiento: this.procedimientoPrincipal[0].NombreSinonimo,
      PermiteEliminacion: true,
      Principal: this.isActive
    }

    this.procedimientoDTO.ProcedimientosPostoperatorios.push(arrayNuevo);
    this.cerrarProcedimineto();

  }

  public cerrarProcedimineto(): void {
    this.procedimientoPrincipal = [];
    this.isActive = null;
    this.addPlantilla = false
  }

  public tipoProcedimiento(value: boolean): void {
    this.isActive = value;
  }

  public eliminarProcedimiento(index: number): void {
    this.procedimientoDTO.ProcedimientosPostoperatorios.splice(index,1);
  }

  private guardarProcedimiento(): void {
    this.updateProcedimiento = {
      TipoDeItem: 'Procedimientos',
      IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental,
      ProcedimientosPostoperatorios: this.procedimientoDTO.ProcedimientosPostoperatorios
    }

    this.cirugiaService.actualizarProcedimientos( this.updateProcedimiento ).subscribe(resu => {
      this.appService.guardadoCorrectoEvent.emit(resu);
      this.cerrarProcedimineto();
    });

  }

  ngOnDestroy() {
    this.eventSubscriptions.forEach(val => val.unsubscribe());
  }

}
