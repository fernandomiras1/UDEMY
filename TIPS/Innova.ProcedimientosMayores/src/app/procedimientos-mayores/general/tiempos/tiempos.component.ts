import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IActoProcedimentalRequest } from '../../../procedimientos-mayores/model/ActoProcedimental';
import { ITiemposDTO, IUpdateTiempoDTO } from '../../../procedimientos-mayores/model/Tiempos';
import {DateTimeDto, DateTimeInputDto} from "tips.comun";
import { IHitosEnActoProcedimental } from '../../model/Tiempos';
import { CrudBaseComponent } from '../../CrudBaseComponent';
import { AppService } from '../../../common/app.service';
import { GeneralService } from '../general.service';

declare var moment;

@Component({
  selector: 'app-tiempos',
  templateUrl: './tiempos.component.html',
  styles: []
})
export class TiemposComponent extends CrudBaseComponent  implements OnInit, OnDestroy {
  @Input() fechaProgramada: string;
  @Input() horaProgramada: string;
  @Input() horaEstimada: string;

  actoProcedimentalRequest: IActoProcedimentalRequest;
  tiemposRequest: ITiemposDTO;
  tiposdeHito: any;
  tiempoUpdate: IUpdateTiempoDTO;

  estadiaInicio: DateTimeInputDto;
  induccionInicio: DateTimeInputDto;
  induccionFin: DateTimeInputDto;
  cirugiaInicio: DateTimeInputDto;
  cirugiaFin: DateTimeInputDto;
  anestesiaFin: DateTimeInputDto;
  estadiaFin: DateTimeInputDto;

  enumTiposDeHito = {
    EstadiaEnSala: "Estadía en Sala",
    Induccion: "Inducción",
    Cirugia: "Cirugía",
    Anestesia: "Anestesia"
  }

  enumTiposDeTiempo = {
    Inicio: "Inicio",
    Fin: "Fin"
  }
  
  dateValidate: Array<any> = new Array<any>();
  
  constructor(private generalService: GeneralService, private appService: AppService ) { super(); }

  ngOnInit() {
    this.obtenerTiemposEnActoProcedimental();
    this.subscribeToEvents();
    this.setMode(this.appService.isView);
  }

  private subscribeToEvents(): void {
    this.eventSubscriptions.push(this.appService.btnGuardarClickeadoEvent.subscribe(() => {
      this.guardarTiempos();
    }));
  }

  private inicializarDate() {
    this.dateValidate.push(this.tiposdeHito.estadiaInicio);
    this.dateValidate.push(this.tiposdeHito.induccionInicio);
    this.dateValidate.push(this.tiposdeHito.induccionFin);
    this.dateValidate.push(this.tiposdeHito.cirugiaInicio);
    this.dateValidate.push(this.tiposdeHito.cirugiaFin);
    this.dateValidate.push(this.tiposdeHito.anestesiaFin);
    this.dateValidate.push(this.tiposdeHito.estadiaFin);
  }

  private obtenerTiemposEnActoProcedimental(): void {
    this.actoProcedimentalRequest = {
      IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental
    }

    this.generalService.obtenerTiemposEnActoProcedimental(this.actoProcedimentalRequest).subscribe((resu: ITiemposDTO) => {
      this.tiemposRequest = resu;

      this.tiposdeHito = {
        estadiaInicio:  this.generarModeloRequest( this.enumTiposDeHito.EstadiaEnSala, this.enumTiposDeTiempo.Inicio, "Ingreso a la sala:") ,
        estadiaFin:  this.generarModeloRequest( this.enumTiposDeHito.EstadiaEnSala, this.enumTiposDeTiempo.Fin, "Salida de la sala:") ,
        induccionInicio:  this.generarModeloRequest( this.enumTiposDeHito.Induccion, this.enumTiposDeTiempo.Inicio, "Comienzo de inducción:") ,
        induccionFin:  this.generarModeloRequest( this.enumTiposDeHito.Induccion, this.enumTiposDeTiempo.Fin, "Fin de inducción:") ,
        cirugiaInicio:  this.generarModeloRequest( this.enumTiposDeHito.Cirugia, this.enumTiposDeTiempo.Inicio, "Comienzo de cirugía:") ,
        cirugiaFin:  this.generarModeloRequest( this.enumTiposDeHito.Cirugia, this.enumTiposDeTiempo.Fin, "Fin de cirugía:") ,
        anestesiaFin:  this.generarModeloRequest( this.enumTiposDeHito.Anestesia, this.enumTiposDeTiempo.Fin, "Fin de anestesia:")
     }
     this.inicializarDate();
     // Inicializo Ingreso a la sala con la fecha actual.
     this.dateValidate[0].Input.CurrentValue = this.dateValidate[0].Input.CurrentValue ? 
                                              this.dateValidate[0].Input.CurrentValue :  this.formatDate(moment().format("DD/MM/YYYY hh:mm:ss'"));
  });
}

  private crearDtoInicializacionInput( tipoDeHito: string, tipoDeTiempo: string, label: string ) {
      return new DateTimeInputDto(  { 
                    "CurrentValue": this.formatDate( this.getIdAndDate(tipoDeHito, tipoDeTiempo).Fecha ), 
                    "Label": label,
                    "Disabled": this.isView,
                    "MinMessage": 'Debe ser mayor a la última fecha anterior cargada' })
  }
  
  private generarModeloRequest( tipoDeHito: string, tipoDeTiempo: string, label: string ){
    return { 
      "IdHitoEnActoProcedimental": this.getIdAndDate(tipoDeHito,
                                                     tipoDeTiempo).IdHitoEnActoProcedimental,
      "TipoDeHito": tipoDeHito, 
      "TipoDeTiempo": tipoDeTiempo,
      "Fecha": this.getIdAndDate(tipoDeHito,tipoDeTiempo).Fecha,
      "Input": this.crearDtoInicializacionInput( tipoDeHito, tipoDeTiempo, label )
    }
  }

 public getIdAndDate(tipoDeHito: string, tipoDeTiempo: string) {
   let hitoEnActoProcedimental : IHitosEnActoProcedimental = 
       this.tiemposRequest.HitosEnActoProcedimental.find( (t : IHitosEnActoProcedimental) => (t.TipoDeHito === tipoDeHito && t.TipoDeTiempo === tipoDeTiempo));
                              
   return (hitoEnActoProcedimental) ?  
      { "IdHitoEnActoProcedimental": hitoEnActoProcedimental.IdHitoEnActoProcedimental, "Fecha": hitoEnActoProcedimental.Fecha } :
      { "IdHitoEnActoProcedimental": 0, "Fecha": undefined } ;
}

  private guardarTiempos(): void {
     this.tiempoUpdate = {
      TipoDeItem: 'Tiempos',
      IdActoProcedimental: this.parametrosInicializacion.IdActoProcedimental,
      HitosEnActoProcedimental: this.dateValidate.filter( hito => hito.Input.CurrentValue ).map((mt: any) => { return { 
        IdHitoEnActoProcedimental: mt.IdHitoEnActoProcedimental, 
        TipoDeHito: mt.TipoDeHito, TipoDeTiempo: mt.TipoDeTiempo,
            Fecha: (mt.Input.CurrentValue) ? String(mt.Input.CurrentValue.Day) + '/' + mt.Input.CurrentValue.Month + '/' + mt.Input.CurrentValue.Year + ' ' +  mt.Input.CurrentValue.Hour + ':' +  mt.Input.CurrentValue.Minute 
            : ''
      }
      })
    }

    if (!this.isInvalidSomeDate()) {
      this.generalService.actualizarTiemposEnActoProcedimental(this.tiempoUpdate).subscribe(resu => {
        this.appService.guardadoCorrectoEvent.emit(resu);
      });
    }

  }

  private isInvalidSomeDate() : boolean {
    return this.dateValidate.some(elemet => { return !elemet.Input.IsValid});
  }

  private formatDate(dateString) {
    if (!dateString) return; 
    let fechaConFormato = moment(dateString, "DD/MM/YYYY hh:mm:ss'");
    return  (fechaConFormato) ?    
        new DateTimeDto (
          fechaConFormato.year(),
          fechaConFormato.month() + 1,
          fechaConFormato.date(),
          fechaConFormato.hours(),
          fechaConFormato.minute(),
          fechaConFormato.seconds()) : undefined;    
  }


  public changeInput(index) {
    if(!this.dateValidate[index].CurrentValue) {
      this.onchangeInput();
    }
  }

  public onchangeInput() {
      this.buscarComparadorAnterior();   
  }  

  private buscarComparadorAnterior() {

    let comparador = ( indiceBusqueda, array )=> {      
      indiceBusqueda--; 
      if ( indiceBusqueda < 0 )  return;
      
      return ( array[indiceBusqueda].Input.CurrentValue ) ?
        array[indiceBusqueda] : comparador( indiceBusqueda, array );
    }
    
    this.dateValidate.forEach( (item, indice, array) => {
      let i = (array.length - indice - 1); 

      let itemComparador = comparador(i, array);
      if( itemComparador ){
        // Le agrego un minuto a la fecha.
        let comparadorCurrentValue = [itemComparador.Input.CurrentValue.AsDate()].map( o => o)[0]; 
        let masUnMinuto = moment(comparadorCurrentValue).add(1, 'minutes')._d;
        array[ i ].Input.Min = this.formatDate(masUnMinuto);
        array[ i ].Input.HasChanged = true
      }
    });   
  }

  ngOnDestroy() {
    this.eventSubscriptions.forEach(val => val.unsubscribe());
  }
}
