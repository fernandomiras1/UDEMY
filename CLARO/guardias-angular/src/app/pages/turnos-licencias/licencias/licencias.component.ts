import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from '@app/services/general.service';

@Component({
  selector: 'app-licencias',
  templateUrl: './licencias.component.html',
  styleUrls: ['./licencias.component.scss']
})
export class LicenciasComponent implements OnInit {
  @Input() sizeParams;
  @Input() licencias;
  //Ancho total de la pantalla
  widthScreen;
  //Ancho columna del boton de licencia
  columnBtnLicence;
  //Ancho columna de los dias del navbar calendar
  columnsDays;
  //Los dias del navbar calendar
  dates;

  constructor(public generalService: GeneralService) { }

  ngOnInit(): void {
    this.calcGridCalendarParams();
    this.setLicenceBar();
  }
  /*Calcular tamaño de las columnas para 4 dias, el tamaño por hora de un turno 
  y obtengo los dias del navbar de calendario*/
  calcGridCalendarParams() {
    const {widthScreen, columnBtnLicence, columnsDays, dates} = this.sizeParams;
    this.widthScreen = widthScreen;
    this.columnBtnLicence = columnBtnLicence;
    this.columnsDays = columnsDays;
    this.dates = dates;
  }
  setLicenceBar() {
    /*Recorro los dias menos el primero y ultimo xq son 6 y solo se visualizan 4 
      despues recorro las licencias y comparo dia a dia si esta de licencia si lo esta
      le seteo el ancho de lo que equivale una columna de dia si no lo desplazo una
    */
    this.dates.forEach((date, index) => {
      if(index !== 0 && index !== (this.dates.length - 1)) {
        this.licencias.forEach(user => {
          let isLicensed = this.generalService.overlappedDate(date.nextDay, date.nextDay, user.fecha_desde, user.fecha_hasta);
          if(isLicensed) {
            user.widthLicence = user.widthLicence ? user.widthLicence + this.columnsDays : this.columnsDays;
          } else {
            if(!user.widthLicence) {
              user.desplazar = user.desplazar ? user.desplazar + this.columnsDays : this.columnsDays;
            }
          }
        });
      }
    });
    this.checkDuplicateInArrayObject('idusuario', this.licencias);
  }
  
  checkDuplicateInArrayObject(propertyName, inputArray) {
    let duplicates = [];
    inputArray.forEach((primary, iPrimary) => {
      inputArray.forEach((secondary, iSecondary) => {
        if(iPrimary !== iSecondary) {
          if(primary[propertyName] === secondary[propertyName]) {
            duplicates.push(secondary);
          }
        }
      });    
    });
  }
}
