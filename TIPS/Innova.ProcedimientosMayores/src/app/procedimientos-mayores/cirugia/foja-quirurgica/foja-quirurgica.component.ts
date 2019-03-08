import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { IObtenerFojaQuirurgicaRequest,IFojaQuirurgicaDTO, IFojaQuirurgica, IUpdateFojaDTO,
        IDocumentosHallazgos, ParticipantesEnFojaDto, PreoperatorioEnFojaDto } from '../../model/FojaQuirurgica';
import { StringInputDto, getErrorMessage, TipsServicioComun } from "tips.comun";
import { CrudBaseComponent } from '../../CrudBaseComponent';
import { CirugiaService } from '../cirugia.service';
import { AppService } from '../../../common/app.service';
import { ProcedimientosMayoresService } from '../../procedimientos-mayores.service';
import { TerminologiaParams, ProcedimientoDto } from '../../model/Procedimiento';
declare var $;

@Component({
  selector: 'app-foja-quirurgica',
  templateUrl: './foja-quirurgica.component.html',
  styles: []
})
export class FojaQuirurgicaComponent extends CrudBaseComponent implements OnInit, OnDestroy {

  @Input() idItemEnActoProcedimental: number;
  @Output() btnCerrar = new EventEmitter();
  
  verDocumentosPlantillas: boolean;
  viewDiagnosticoSecundario: boolean;
  viewProcedimientoSecundario: boolean;
  inputOpenPlantilla: boolean;

  obtenerFojaQuirurgicaRequest: IObtenerFojaQuirurgicaRequest;
  fojaQuirurgicaDTO: IFojaQuirurgica;
  updateFojaDTO: IUpdateFojaDTO;
  paramsDiagnostico: TerminologiaParams;
  paramsProcedimiento: TerminologiaParams;

  observationsRequired: Array<any> = new Array<any>();
  participantesEnFoja: Array<ParticipantesEnFojaDto> = new Array<ParticipantesEnFojaDto>();

  obsComplicaciones: StringInputDto<string>;
  obsTranfusiones: StringInputDto<string>;
  obsEspecimenes: StringInputDto<string>;
  obsDispositivosProtesticos: StringInputDto<string>;
  obsInjertos: StringInputDto<string>;


  constructor(private cirugiaService: CirugiaService,
              private tipsServicioComun: TipsServicioComun,
              private procedimientoService: ProcedimientosMayoresService,
              private appService: AppService ) { super(); }

  ngOnInit() {
    this.paramsDiagnostico = { IdDominioDeTerminologia: 64 }
    this.paramsProcedimiento = { IdDominioDeTerminologia: 128 }
    this.obtenerFojaQuirurgica();
    this.subscribeToEvents();
    this.setMode(this.appService.isView);
    $('#modal-agregar-documento-plantilla').on('hidden.bs.modal', () => {
      this.closeModalDocumento();
    });
  }

  private inicializarSwitch(): void {
    // Diagnóstico secundario
    this.fojaQuirurgicaDTO.DiagnosticosSecundariosEnFoja.length > 0 ? 
                              this.viewDiagnosticoSecundario = true : this.viewDiagnosticoSecundario = false;

    // Procedimiento secundario                              
    this.fojaQuirurgicaDTO.ProcedimientosSecundariosEnFoja.length > 0 ?
                              this.viewProcedimientoSecundario = true : this.viewProcedimientoSecundario = false;
  }

  private subscribeToEvents(): void {
    this.eventSubscriptions.push(this.appService.btnGuardarClickeadoEvent.subscribe(() => {
      this.guardarFoja();
    }));
  }

  private obtenerFojaQuirurgica(): void {
    this.obtenerFojaQuirurgicaRequest = {
      IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental,
      IdItemEnActoProcedimental: this.idItemEnActoProcedimental
    }

    this.cirugiaService.obtenerFojaQuirurgica(this.obtenerFojaQuirurgicaRequest).subscribe((resu: IFojaQuirurgicaDTO) => {
      if ( resu.Codigo == 200) {
        this.fojaQuirurgicaDTO = resu.FojaQuirurgica;
        this.participantesEnFoja = resu.FojaQuirurgica.ParticipantesEnFoja;
        this.inicializarSwitch();
        // this.inicializarPreoperatoriosEnFoja(this.fojaQuirurgicaDTO);
        this.fojaQuirurgicaDTO.DocumentosHallazgos.length > 0 ? this.inputOpenPlantilla = true : this.inputOpenPlantilla = false;
        this.inicializarObservations();
      
      }
    });

  }

  private inicializarObservations(): void {
    this.observationsRequired.push(this.obsComplicaciones = this.crearDtoInicializacionInput('ObservacionesComplicaciones'));
    this.observationsRequired.push(this.obsTranfusiones = this.crearDtoInicializacionInput('ObservacionesTranfusiones'));
    this.observationsRequired.push(this.obsEspecimenes = this.crearDtoInicializacionInput('ObservacionesEspecimenes'));
    this.observationsRequired.push(this.obsDispositivosProtesticos = this.crearDtoInicializacionInput('ObservacionesDispositivosProtesticos'));
    this.observationsRequired.push(this.obsInjertos = this.crearDtoInicializacionInput('ObservacionesInjertos'));
  }

  private crearDtoInicializacionInput(property) {
    return new StringInputDto({
      "CurrentValue": (this.fojaQuirurgicaDTO[property] || ""),
      "Label": 'Observaciones',
      "Disabled": this.isView, 
      "RequiredMessage": "El campo es obligatorio"
    })
  }

  public selectButtonGral(propery: string, observations: string, value: string): void {
    this.fojaQuirurgicaDTO[propery] = this.fojaQuirurgicaDTO[propery] === value ? null: value;
    if (observations != null) {
      this[observations].CurrentValue = "";
    }
  }

  public getIsActive(propery: string, value: string): boolean {
    return this.fojaQuirurgicaDTO[propery] === value;
  }

  private validarCamposRequeridos(input: StringInputDto<string>, value: string): void {
    input.Required = this.getIsActive(value, 'Si');
    input.HasChanged = true;
  }

  private isInvalidSomeAutoComplete(preoperatorio: Array<PreoperatorioEnFojaDto>, mensaje: string, mostrarValidacion: boolean): boolean {
    if ( preoperatorio.length == 0 && mostrarValidacion) {
      this.tipsServicioComun.announceNewInternalError(getErrorMessage("error", mensaje, "", 7));
      return true;
    }
  }

  private isInvalidSomeInput(): boolean {
    return this.observationsRequired.some(elemet => { return !elemet.IsValid});
  }

  public viewModalPlantillas() {
    this.verDocumentosPlantillas = true;
  }

  private closeModalDocumento() {
   this.verDocumentosPlantillas = false;
  }
  
  public agregarDocumentoAlActo(documento) {
   let doc: IDocumentosHallazgos = {
      Id: 0,
      Nombre: documento.titulo,
      IdDocumento: documento.id
    }
   this.fojaQuirurgicaDTO.DocumentosHallazgos.push(doc);
   this.closeModalDocumento();
  }

  eliminarDocumento(index: number): void {
    this.fojaQuirurgicaDTO.DocumentosHallazgos.splice(index,1);
  }

  verDocumento(idDocumento: number) {
    this.procedimientoService.impresionDeDocumentos(idDocumento).subscribe(resu => {
      if (resu.Codigo == 200) {
       this.imprimirDocumento(resu.ReporteEnBase64);
      } else {
        this.tipsServicioComun.announceNewInternalError(getErrorMessage("error", resu.Mensaje, "", 5));
      }
    }, () => {
      this.tipsServicioComun.announceNewInternalError(getErrorMessage("error", "Ocurrió un error al visualizar el documento.", "", 5));
    });
  }

  closePopover(popover) {
    $('.item-hover').removeAttr('style');
    popover.close();
  }

  openPopover(popover, e) {
    $('ngb-popover-window').remove();
    popover.close();
    popover.open();
    $('.item-hover').removeAttr('style');
    e.currentTarget.style.opacity = 1;
    event.stopPropagation();
    $('.popover-body').addClass('popover-eliminar');
  }

  public eliminarParticipante(item: ParticipantesEnFojaDto, index: number): void {
    // Tiene que tener al menos un Responsable Principal.
    if ( !item.ResponsablePrincipal || this.participantesEnFoja.filter(p => p.ResponsablePrincipal).length > 1 ) {
      this.participantesEnFoja.splice(index, 1);
    } else {
      this.tipsServicioComun.announceNewInternalError(getErrorMessage("error", "Tiene que tener al menos un Responsable Principal.", "", 5));
    }
    
  }
  
  // Mapeo los datos del SRV Terminologia.
  private mapearSavePostoperatorio( item: Array<ProcedimientoDto> ): Array<PreoperatorioEnFojaDto> {
   return item.map((p: ProcedimientoDto) => { return {
      Id: 0,
      IdEnActo: 0,
      IdTermino: p.IdTermino,
      NombreSinonimo: p.NombreSinonimo
    }});
  }

  public guardarFoja(): void {

    this.validarCamposRequeridos(this.obsComplicaciones, 'Complicaciones');
    this.validarCamposRequeridos(this.obsTranfusiones, 'Tranfusiones');
    this.validarCamposRequeridos(this.obsEspecimenes, 'Especimenes');
    this.validarCamposRequeridos(this.obsDispositivosProtesticos, 'DispositivosProtesticos');
    this.validarCamposRequeridos(this.obsInjertos, 'Injertos');

    if (!this.isInvalidSomeInput()) {

      this.fojaQuirurgicaDTO.ObservacionesComplicaciones = this.obsComplicaciones.CurrentValue;
      this.fojaQuirurgicaDTO.ObservacionesTranfusiones = this.obsTranfusiones.CurrentValue;
      this.fojaQuirurgicaDTO.ObservacionesEspecimenes = this.obsEspecimenes.CurrentValue;
      this.fojaQuirurgicaDTO.ObservacionesDispositivosProtesticos = this.obsDispositivosProtesticos.CurrentValue;
      this.fojaQuirurgicaDTO.ObservacionesInjertos = this.obsInjertos.CurrentValue;
      
      this.fojaQuirurgicaDTO.DiagnosticosPrincipalesEnFoja = this.mapearSavePostoperatorio(this.fojaQuirurgicaDTO.DiagnosticosPrincipalesEnFoja);
      this.fojaQuirurgicaDTO.DiagnosticosSecundariosEnFoja = this.mapearSavePostoperatorio(this.fojaQuirurgicaDTO.DiagnosticosSecundariosEnFoja);
      this.fojaQuirurgicaDTO.ProcedimientosPrincipalesEnFoja = this.mapearSavePostoperatorio(this.fojaQuirurgicaDTO.ProcedimientosPrincipalesEnFoja);
      this.fojaQuirurgicaDTO.ProcedimientosSecundariosEnFoja = this.mapearSavePostoperatorio(this.fojaQuirurgicaDTO.ProcedimientosSecundariosEnFoja);
  
      // Validaciones en Postoperatorio
      if (this.isInvalidSomeAutoComplete(this.fojaQuirurgicaDTO.DiagnosticosPrincipalesEnFoja, 'Por favor, ingrese al menos un Diagnóstico Principal.', true)) return;
      if (this.isInvalidSomeAutoComplete(this.fojaQuirurgicaDTO.ProcedimientosPrincipalesEnFoja, 'Por favor, ingrese al menos un Procedimiento Principal.', true)) return;

      if (this.isInvalidSomeAutoComplete(this.fojaQuirurgicaDTO.DiagnosticosSecundariosEnFoja, 'Por favor, ingrese al menos un Diagnóstico Secundario.', this.viewDiagnosticoSecundario)) return;
      if (this.isInvalidSomeAutoComplete(this.fojaQuirurgicaDTO.ProcedimientosSecundariosEnFoja, 'Por favor, ingrese al menos un Procedimiento Secundario.', this.viewProcedimientoSecundario)) return;

      if(this.fojaQuirurgicaDTO.DiagnosticosSecundariosEnFoja.length == 0 && this.fojaQuirurgicaDTO.ProcedimientosSecundariosEnFoja.length > 0) {
        this.tipsServicioComun.announceNewInternalError(getErrorMessage("error", "Por favor, ingrese un Diagnóstico secundario.", "", 7));
        return;
      }
      // Fin de las Validaciones en Postoperatorio

      this.updateFojaDTO = {
        IdItem: this.idItemEnActoProcedimental,
        TipoDeItem: 'Foja quirúrgica',
        IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental,
        FojaQuirurgica: this.fojaQuirurgicaDTO
      }
      console.log(this.updateFojaDTO.FojaQuirurgica);
     
      // this.cirugiaService.actualizarFojaQuirurgica(this.updateFojaDTO).subscribe( resu => {
      //   this.appService.guardadoCorrectoEvent.emit(resu);
      //   this.cerrar();
      // });

    } else {
      this.tipsServicioComun.announceNewInternalError(getErrorMessage('error', 'Por favor complete todos los campos obligatorios', '', 5));
    }
  
  }

  public onChangeSwitchDiagnostico(opcion: boolean) {
    if (!opcion) this.fojaQuirurgicaDTO.DiagnosticosSecundariosEnFoja = [];
    this.viewDiagnosticoSecundario = opcion;
  }

  public onChangeSwitchProcedimiento(opcion: boolean) {
    if (!opcion) this.fojaQuirurgicaDTO.ProcedimientosSecundariosEnFoja = [];
    this.viewProcedimientoSecundario = opcion;
  }

  public cerrar(): void {
    this.btnCerrar.emit(false);
  }

  ngOnDestroy() {
    this.eventSubscriptions.forEach(val => val.unsubscribe());
  }

}
