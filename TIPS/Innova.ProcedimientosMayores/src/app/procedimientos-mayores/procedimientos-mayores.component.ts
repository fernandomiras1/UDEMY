import { Component, OnInit, Input } from '@angular/core';
import { ProcedimientosMayoresService } from './procedimientos-mayores.service';
import { IActoProcedimentalDTO, Cabecera, Secciones, SeccionDocumentos, ItemSeccionProcedimiento, ICambiarEstadoDeItemRequest } from './model/ActoProcedimental';
import { AppService } from '../common/app.service';
import { CrudBaseComponent } from './CrudBaseComponent';
declare var $;

@Component({
  selector: 'app-procedimientos-mayores',
  templateUrl: './procedimientos-mayores.component.html',
  styles: []
})

export class ProcedimientosMayoresComponent extends CrudBaseComponent implements OnInit {

  @Input() parametrosInicializacion = { IdActoProcedimental: 105, IdEvento: 227441, IdPersona: 102332};
  actoProcedimental: IActoProcedimentalDTO;
  cabecera: Cabecera;
  secciones: Secciones;
  documentos: SeccionDocumentos;
  eventSubscriptions: Array<any> = new Array();
  showFojaQuirurgica: boolean;
  cambiarEstadoDeItemRequest: ICambiarEstadoDeItemRequest;
  isDisabled: boolean;

  enumTipoProcedimientos = {
    Participantes: "Participantes",
    ChecklistPreinduccion: "Checklist - Preinducción",
    ChecklistPausa: "Checklist - Pausa/Time out",
    ChecklistSignOut: "Checklist - Sign out",
    Tiempos: "Tiempos",
    NotaPreoperatoria: "Nota preoperatoria",
    FojaQuirurgica: "Foja quirúrgica"
  }

  /**
   * procedimiento visualizado.
   */
  public procedimientoSelected: ItemSeccionProcedimiento;

  /**
   * indica si el modal esta activo.
   */
  constructor(public appService: AppService, private procedimientosService: ProcedimientosMayoresService) { super(); }

  ngOnInit() {
    this.inicializarActoProcedimental();
    this.subscribeToEvents();
    /**
       * metodo para capturar el evento close del modal.
    */
    $('#modal-general').on('hidden.bs.modal', () => {
      this.closeModal();
    });
  }

  private inicializarActoProcedimental(): void {    
    this.procedimientosService.inicializarActoProcedimental( this.parametrosInicializacion.IdActoProcedimental ).subscribe((resu: IActoProcedimentalDTO) => {
      this.actoProcedimental = resu;
      this.cabecera = resu.EstructuraDeActoProcedimental.Cabecera;
      this.secciones = resu.EstructuraDeActoProcedimental.Secciones;
      this.documentos = resu.EstructuraDeActoProcedimental.SeccionDocumentos;
    });
  }

  public filtrarItemsSeccion(items: Array<ItemSeccionProcedimiento>) {
    if (!items) return items;
    return items.filter(item => item.Permisos.Consulta || item.Permisos.Edicion);
  }

  private subscribeToEvents() {
    this.eventSubscriptions.push(this.appService.guardadoCorrectoEvent.subscribe((resu: any) => {
      this.procedimientoSelected.Auditoria = resu.ItemEnActoProcedimental.Auditoria;
      this.procedimientoSelected.Estado = resu.ItemEnActoProcedimental.Estado;
      this.procedimientoSelected.Icono = resu.ItemEnActoProcedimental.Icono;
      this.closeModal();
    }));
  }

  cambiarEstadoDeItem(item: ItemSeccionProcedimiento, status: boolean) {
    this.isDisabled = status;
    this.cambiarEstadoDeItemRequest = {
      IdItem: item.IdItem,
      Habilitado: status
    }

    this.procedimientosService.cambiarEstadoDeItem( this.cambiarEstadoDeItemRequest ).subscribe(resu => {
     item.Auditoria = resu.ItemEnActoProcedimental.Auditoria;
     item.Estado = resu.ItemEnActoProcedimental.Estado;
     item.Icono = resu.ItemEnActoProcedimental.Icono;
    });
  }

  public openModal( item: ItemSeccionProcedimiento, isView: boolean ): void {    
    this.procedimientoSelected = item;
    this.appService.isView = isView;
    if (this.enumTipoProcedimientos.FojaQuirurgica == item.Tipo) {
      // Open Foja Quirurgica
      this.showFojaQuirurgica = true;
    } else {
      this.showModal();
    }
  }

  public verDocumento(idDocumento: number): void {
    this.procedimientosService.impresionDeDocumentos(idDocumento).subscribe(resu => {
      if (resu.Codigo == 200) {
        this.imprimirDocumento(resu.ReporteEnBase64);
      }
    });
  }

  /**
   * metodo para mostrar el modal.
   */
  private showModal(): void {
    // open modal
    $("#modal-general").modal('show');
  }

  public closeModal(): void {
    $("#modal-general").modal('hide');
    this.procedimientoSelected = null;
  }

  public guardarModal(): void {
    this.appService.btnGuardarClickeadoEvent.emit();
  }

}