import { Component, OnInit, OnDestroy } from '@angular/core';
import { TipsServicioComun, getErrorMessage, PaginadorDto } from 'tips.comun';
import { GeneralService } from '../general.service';
import { IBuscarParticipantes, IParticipante, Roles, Participante, IUpdateParticipante } from '../../model/Participantes';
import { CrudBaseComponent } from '../../CrudBaseComponent';
import { IActoProcedimentalRequest } from '../../model/ActoProcedimental';
import { AppService } from '../../../common/app.service';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styles: []
})
export class ParticipantesComponent extends CrudBaseComponent implements OnInit, OnDestroy {
  
  listaSeleccionados: Array<Participante> = new Array<Participante>();
  resultParticipantes: Array<IBuscarParticipantes> = new Array<IBuscarParticipantes>();
  searchResultsPaginated: Array<any> = new Array<any>();
  selectRoles: Array<Roles> = new Array<Roles>();

  participantes: IParticipante;
  buscarParticipantes: IBuscarParticipantes;
  idActoProcedimentalRequest: IActoProcedimentalRequest;
  
  busquedaHabilitada: boolean;
  mostrarParticipantes: boolean;
  addParticipante: boolean;

  /**
     * modelo para el paginador.
  */
  paginadorModel: PaginadorDto;

  constructor( private generalService: GeneralService,
               private appService: AppService,
               private tipsServicioComun: TipsServicioComun) { super(); }

  ngOnInit() {
    this.subscribeToEvents();
    this.obtenerParticipantes();
    this.setMode(this.appService.isView);
  }

  private subscribeToEvents(): void {
    this.eventSubscriptions.push(this.appService.btnGuardarClickeadoEvent.subscribe(() => {
        this.guardarParticipante();
      }));
  }

  public obtenerParticipantes(): void {
    this.idActoProcedimentalRequest = {
      IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental
    }

    this.generalService.obtenerParticipantes( this.idActoProcedimentalRequest ).subscribe((resu: IParticipante) => {
      this.participantes = resu;
      this.selectRoles = resu.Roles;
    });

  }

  public changeRoles(id: number, item: Participante) {
    item.IdRol = id;
  }

  public buscarProfesionales( nombre: string, apellido: string ): void {

    this.buscarParticipantes = {
      Nombre: nombre,
      Apellido: apellido,
      IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental
    }

    this.listaSeleccionados = [];
    if (this.isLengthValid(nombre) || this.isLengthValid(apellido) ) {
    
      this.generalService.buscarParticipantes(this.buscarParticipantes).subscribe(response => {
        this.resultParticipantes = response.ListaDeParticipantes;
          // modelo del paginador
          this.paginadorModel = new PaginadorDto();
          this.paginadorModel.PageSize = 10;
          this.paginadorModel.TotalCount = this.resultParticipantes.length;
          this.searchResultsPaginated = this.resultParticipantes.slice(0, 10);
          }, () => {
            this.tipsServicioComun.announceNewInternalError(getErrorMessage("error", "Ocurrió un error inesperado.", "", 5));
          });
    }
  }

  public habilitarBtn(nombre: string, apellido: string): void {
     (nombre || apellido) ? this.busquedaHabilitada = true :  this.busquedaHabilitada = false;
  }

  public seleccionar(item: Participante, event: any): void {
    if (event.target.checked) {
      this.listaSeleccionados.push(item);
    }
    else {
      let indexEliminar = this.listaSeleccionados.findIndex((el: Participante) => {
      if (el["IdRecurso"] == item["IdRecurso"]) return true; });
      this.listaSeleccionados.splice(indexEliminar, 1);
    }
  }

  public agregarParticipantes(): void {
    if (this.listaSeleccionados.length > 0) {

      this.listaSeleccionados.forEach( (addProfesional: Participante) => {
        // Verifico si hay Procedimientos Duplicados
        if ( this.permiteDuplicado(addProfesional).esDuplicado ) {
          let nombre = String(this.permiteDuplicado(addProfesional).nombre);
  
          this.tipsServicioComun.announceNewInternalError(getErrorMessage("error", `${ nombre.charAt(0).toUpperCase() + nombre.toLowerCase().slice(1) } ya existe para ese servicio.` , "", 7));
          return;
        }
        // Verifico si ya tiene un Responsable Principal. Si no tiene se lo agrego.
        if ( !this.tieneResponsablePrincipal(addProfesional) ) {
          addProfesional.ResponsablePrincipal = true;
        } else {
          addProfesional.ResponsablePrincipal = false;
        }

        addProfesional.PermiteDesmarcarComoPrincipal = true;
        addProfesional.PermiteEliminar = true; 
      
        this.participantes.Participantes.push(addProfesional);
        return;
      });
      this.cerrarParticipante();
    } else {
      this.tipsServicioComun.announceNewInternalError(getErrorMessage("error", "Ingrese al menos un Participante.", "", 7));
      return;
    }
  }

  private permiteDuplicado(item: Participante): { esDuplicado: boolean, nombre: string } {
    let esDuplicado: boolean;
    let nombre: string;
    this.participantes.Participantes.forEach(p => {
        if ( item.IdRecurso == p.IdRecurso && item.IdServicio == p.IdServicio ) {
          esDuplicado = true;
          nombre = p.Nombre;
        }
   });
   return { esDuplicado, nombre };
  }

  public cerrarParticipante(): void {
    this.listaSeleccionados = [];
    this.searchResultsPaginated = [];
    this.mostrarParticipantes = false
  }

  public eliminarParticipante(index: number, responsablePrincipal: boolean): void {
    if (responsablePrincipal) {
      this.tipsServicioComun.announceNewInternalError(getErrorMessage("error", "No se puede eliminar un responsable principal.", "", 7));
    } else {
      this.participantes.Participantes.splice(index,1);
    }
  }

  public responsablePrincipal(item: Participante) {
    if ( !this.isView && !this.permiteDesmarcar(item) && !item.ResponsablePrincipal ) {
      item.ResponsablePrincipal =! item.ResponsablePrincipal
      this.participantes.Participantes.filter(p => (item.IdServicio == p.IdServicio && item.IdRecurso != p.IdRecurso)).forEach(c => c.ResponsablePrincipal = false);
    }
  }

  private permiteDesmarcar( item: Participante ): boolean {
   return this.participantes.Participantes.filter(pf => item.IdServicio == pf.IdServicio).some(p => !p.PermiteDesmarcarComoPrincipal);
  }

  private tieneResponsablePrincipal( item: Participante ): boolean {
    return this.participantes.Participantes.filter(pf => item.IdServicio == pf.IdServicio).some(p => p.ResponsablePrincipal);
  }

  public paginateBuscarProfesional(event: PaginadorDto): void {
    event.PageNumber--;
    this.searchResultsPaginated = this.resultParticipantes.slice(event.PageNumber * event.PageSize, (event.PageNumber + 1) * event.PageSize);
    this.listaSeleccionados = [];
  }

  public guardarParticipante(): void {
    if (this.participantes.Participantes.some(p => p.IdRol == 0)) {
      this.tipsServicioComun.announceNewInternalError(getErrorMessage("error", "Todos los Participantes deben tener un rol.", "", 7));
      return;
    }

      let updateParticipante: IUpdateParticipante = {
        TipoDeItem: 'Participantes',
        IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental,
        Participantes: this.participantes.Participantes.map( (p: Participante) => {
          return {
            IdParticipante: p.IdParticipante,
            IdRecurso: p.IdRecurso,
            IdServicio: p.IdServicio,
            IdRol: p.IdRol,
            ResponsablePrincipal: p.ResponsablePrincipal
          }
        })
      }
  
       this.generalService.actualizarParticipantes(updateParticipante).subscribe(resu => {
        this.appService.guardadoCorrectoEvent.emit(resu);
       });
  }

  ngOnDestroy() {
    this.eventSubscriptions.forEach(val => val.unsubscribe());
  }

}
