import { Component, OnInit, OnDestroy } from '@angular/core';
import { IActoProcedimentalRequest } from '../../model/ActoProcedimental';
import { NotaPreoperatoriaDTO, NotaPreoperatoria, IUpdateNotaDTO, UnidadesDeDestino } from '../../model/NotaPreoperatoria';
import { StringInputDto, SelectInputDto, SelectListItemDto } from "tips.comun";
import { CrudBaseComponent } from '../../CrudBaseComponent';
import { CirugiaService } from '../cirugia.service';
import { AppService } from '../../../common/app.service';


@Component({
  selector: 'app-nota-preoperatoria',
  templateUrl: './nota-preoperatoria.component.html',
  styles: []
})
export class NotaPreoperatoriaComponent extends CrudBaseComponent implements OnInit, OnDestroy {
  
  actoProcedimentalRequest: IActoProcedimentalRequest;
  notaRequest: NotaPreoperatoriaDTO;
  notaPreoperatoria: NotaPreoperatoria;
  updateNotaPreoperatoria: IUpdateNotaDTO;

  obsAptoValoracionPreanestesica: StringInputDto<string>;
  obsRiesgosOperativos: StringInputDto<string>;
  obsDocumentacionCompleta: StringInputDto<string>;
  obsPacienteEnCondiciones: StringInputDto<string>;

  selectDestino: SelectInputDto;
  selectItemsList = new Array<SelectListItemDto>();

  constructor(private cirugiaService: CirugiaService, private appService: AppService ) { super(); }

  ngOnInit() {
    this.obtenerNotaPreoperatoria();
    this.subscribeToEvents();
    this.setMode(this.appService.isView);
  }

  private subscribeToEvents(): void {
    this.eventSubscriptions.push(this.appService.btnGuardarClickeadoEvent.subscribe(() => {
        this.guardarNotaPreoperatoria();
      }));
  }

  private obtenerNotaPreoperatoria(): void {
    this.actoProcedimentalRequest = {
      IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental
    }

    this.cirugiaService.obtenerNotaPreoperatoria(this.actoProcedimentalRequest).subscribe((resu: NotaPreoperatoriaDTO) => {
      this.notaRequest = resu;
      this.notaPreoperatoria = resu.NotaPreoperatoria;
  
      this.selectDestino = this.crearDtoInicializacionSelect(this.notaRequest.UnidadesDeDestino);
      this.obsAptoValoracionPreanestesica = this.crearDtoInicializacionInput('ObservacionesAptoValoracionPreanestesica');
      this.obsRiesgosOperativos = this.crearDtoInicializacionInput('ObservacionesRiesgosOperativos');
      this.obsDocumentacionCompleta = this.crearDtoInicializacionInput('ObservacionesDocumentacionCompleta');
      this.obsPacienteEnCondiciones = this.crearDtoInicializacionInput('ObservacionesPacienteEnCondiciones');
    });
  }

  private crearDtoInicializacionSelect(item: UnidadesDeDestino[]): SelectInputDto {
    return new SelectInputDto({
      "CurrentValue": (this.notaPreoperatoria.IdUnidadDeDestino || 0),
       "PlaceHolder": "Seleccione...",
       "Name": "Unidad de Destino",
       "Disabled": false,
       "Visible": true,
       "OptionList": this.crearListaSelect(item)
    })
  }

  private crearListaSelect(item: UnidadesDeDestino[]) {
     item.forEach((element: UnidadesDeDestino) => {
      const item = new SelectListItemDto();
      item.Text = element.Nombre;
      item.Value = element.Id;
      this.selectItemsList.push(item);
    });
    return this.selectItemsList
  }

  private crearDtoInicializacionInput(property) {
       return new StringInputDto({
      "CurrentValue": (this.notaPreoperatoria[property] || ""),
      "Disabled": this.isView,
      "RequiredMessage": "El campo es obligatorio"
    })
  }

  public selectButtonGral(property: string, observations: string, value: string): void {
    this.notaPreoperatoria[property] = this.notaPreoperatoria[property] === value ? null : value;
  
    if (observations != null) {
        this[observations].CurrentValue = "";
    }
  }

  public getIsActive(property: string, value: string): boolean {
    return this.notaPreoperatoria[property] === value;
  }

  private guardarNotaPreoperatoria(): void {

    this.validarCamposRequeridos(this.obsAptoValoracionPreanestesica, 'AptoValoracionPreanestesica');
    this.validarCamposRequeridos(this.obsDocumentacionCompleta, 'DocumentacionCompleta');
    this.validarCamposRequeridos(this.obsPacienteEnCondiciones, 'PacienteEnCondiciones');
    this.validarCamposRequeridos(this.obsRiesgosOperativos, 'ExplicaRiesgosOperativos');

    if (!this.obsAptoValoracionPreanestesica.IsValid || !this.obsDocumentacionCompleta.IsValid ||
        !this.obsPacienteEnCondiciones.IsValid || !this.obsRiesgosOperativos.IsValid) {

        return;
    }

    this.notaPreoperatoria.ObservacionesAptoValoracionPreanestesica = this.obsAptoValoracionPreanestesica.CurrentValue;
    this.notaPreoperatoria.ObservacionesDocumentacionCompleta = this.obsDocumentacionCompleta.CurrentValue;
    this.notaPreoperatoria.ObservacionesPacienteEnCondiciones = this.obsPacienteEnCondiciones.CurrentValue;
    this.notaPreoperatoria.ObservacionesRiesgosOperativos = this.obsRiesgosOperativos.CurrentValue;
    this.notaPreoperatoria.IdUnidadDeDestino = this.selectDestino.CurrentValue;

    this.updateNotaPreoperatoria = {
      TipoDeItem: 'Nota preoperatoria',
      IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental,
      NotaPreoperatoria: this.notaPreoperatoria
    }

    this.cirugiaService.actualizarNotaPreoperatoria(this.updateNotaPreoperatoria).subscribe(resu => {
      this.appService.guardadoCorrectoEvent.emit(resu);
    });
    
  }

  private validarCamposRequeridos(input: StringInputDto<string>, value: string) {
    input.Required = this.getIsActive(value, 'No');
    input.HasChanged = true;
  }

  ngOnDestroy() {
    this.eventSubscriptions.forEach(val => val.unsubscribe());
  }

}
