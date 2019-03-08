import { Component, OnInit,OnChanges, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { IChecklistDTO, IRequestCheckPreinduccion, ItemsDeConfiguracion, IUpdateChecklistDTO } from '../../model/Checklist';
import { CrudBaseComponent } from '../../CrudBaseComponent';
import { GeneralService } from '../general.service';
import { AppService } from '../../../common/app.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styles: []
})
export class ChecklistComponent extends CrudBaseComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tipoNombre: string;
  @Input() cabeceraTitulo: string;

  checklistPreinduccion: IChecklistDTO;
  nombreTipoObtener: string;
  checklistUpdateDTO: IUpdateChecklistDTO;

  requestCheckPreinduccion: IRequestCheckPreinduccion;
  verInputObservaciones: boolean;
  items: ItemsDeConfiguracion[];

  constructor(private generalService: GeneralService, private appService: AppService ) { super();}

  ngOnInit() {
   this.obtenerChecklistEnActoProcedimental();
   this.subscribeToEvents();
   this.setMode(this.appService.isView);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.parametrosInicializacion.previousValue != changes.parametrosInicializacion.currentValue) {
      if (this.tipoNombre === 'Checklist - Preinducción') { this.nombreTipoObtener = 'Preinduccion' }
      if (this.tipoNombre === 'Checklist - Pausa/Time out') { this.nombreTipoObtener = 'Pausa' }
      if (this.tipoNombre === 'Checklist - Sign out') { this.nombreTipoObtener = 'SignOut' }
    }
  }

  private subscribeToEvents(): void {
    this.eventSubscriptions.push(this.appService.btnGuardarClickeadoEvent.subscribe(() => {
      this.guardarChecklist();
    }));

    // this.eventSubscriptions.push(this.generalService.btnCancelarClickeadoEvent.subscribe(() => {
    //   //lo que haya que hacer previo a destruir el componente va acá
    //   this.ngOnDestroy();
    // }));
  }

  private obtenerChecklistEnActoProcedimental(): void {

    this.requestCheckPreinduccion = {
      IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental,
      NombreTipoDeChecklist: this.nombreTipoObtener
    }

    this.generalService.obtenerChecklistEnActoProcedimental(this.requestCheckPreinduccion).subscribe((resu: IChecklistDTO) => {
      this.checklistPreinduccion = resu;
      this.items = resu.ConfiguracionChecklist.ItemsDeConfiguracion;
    });
  }

  public selectButton(item : ItemsDeConfiguracion, opcion, posiblesValoresDeRespuesta ) {
    opcion.Seleccionado =! opcion.Seleccionado;
    posiblesValoresDeRespuesta.filter(pv => (opcion.Nombre != pv.Nombre)).forEach(c => { c.Seleccionado = false });
    if (item.Observaciones) item.Observaciones = "";
  }

  public isVisible(item): boolean {
    return item.PosiblesValoresDeRespuesta.filter(resp => resp.Seleccionado && resp.PermiteObservaciones ).length > 0;
  }

  public changeSeleccionable(evento, posiblesValoresDeRespuesta){
    let opcion = evento.target.value;
    posiblesValoresDeRespuesta.forEach(pv => { pv.Seleccionado = (opcion == pv.Nombre) });    
  }

  private guardarChecklist(): void {
    this.checklistUpdateDTO = {
      TipoDeItem: this.tipoNombre,
      IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental,
      ChecklistEnActoProcedimental: {
        IdChecklistEnActoProcedimental: this.checklistPreinduccion.ConfiguracionChecklist.IdChecklistEnActoProcedimental,
        IdConfiguracionChecklist: this.checklistPreinduccion.ConfiguracionChecklist.IdConfiguracionChecklist,
        ItemsChecklistEnActoProcedimental: this.items.filter((item: any) => item.TipoDeItem !== 'titulo').map((item: any) => {
          return { IdItemDeChecklistEnActoProcedimental: item.IdItemDeChecklistEnActoProcedimental,
            IdItemDeConfiguracionChecklist: item.IdItemDeConfiguracionChecklist,
            Observaciones: item.Observaciones,
            Valor: item.PosiblesValoresDeRespuesta.find(pvr => pvr.Seleccionado) ? item.PosiblesValoresDeRespuesta.find(pvr => pvr.Seleccionado).Nombre : null
           }
        })
      }
    }

  
     this.generalService.actualizarChecklistEnActoProcedimental(this.checklistUpdateDTO).subscribe(resu => {
       this.appService.guardadoCorrectoEvent.emit(resu);
    });

  }

  ngOnDestroy() {
    this.eventSubscriptions.forEach(val => val.unsubscribe());
  }
}
