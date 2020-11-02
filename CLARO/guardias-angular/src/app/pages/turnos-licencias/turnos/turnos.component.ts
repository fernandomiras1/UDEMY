import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from '@app/services/general.service';
import * as moment from 'moment';
import { DataObsService } from '@app/services/data-obs.service';
import { TurnosLicenciasService } from '@app/services/turnos-licencias.service';
import { SessionManagerService } from '@app/services/session-manager.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ModalTurnoComponent } from '@app/components/modal-turno/modal-turno.component';
import { Router } from '@angular/router';
import { ModalShowTurnComponent } from '../../../components/modal-show-turn/modal-show-turn.component';
import { ModalDisabledTurnComponent } from '../../../components/modal-disabled-turn/modal-disabled-turn.component';
import { transformStringInDates } from "@app/utils/dates.operations";
import { COLORS_TEMPLATES } from '@app/utils/static.data';
import { TurnUserByColor } from '@app/models/turn.model';
@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {
  @Input() sizeParams;
  @Input() groupPlanning;
  @Input() licencias;
  @Input() guardLoged;

  turnUser: TurnUserByColor[] = [];
  countIterationGetColor = -1;
  
  //Ancho total de la pantalla
  widthScreen;
  //Ancho columna del boton de licencia
  columnBtnLicence;
  //Ancho columna de los dias del navbar calendar
  columnsDays;
  //Tamaño por hora en px de los turnos
  sizeHourTurnCard;
  //Los dias del navbar calendar
  dates;
  //Variable para desabilitar la zona de drop de los turnos
  dndDropzoneDisabled: boolean;
  //Variable para mostrar el modal
  showLoadingModal: boolean;
  userRol;
  constructor(public generalService: GeneralService,
              private dataobsservice: DataObsService,
              private turnosService: TurnosLicenciasService,
              public dialog: MatDialog,
              private router: Router) {}

  ngOnInit(): void {
    this.userRol = JSON.parse(SessionManagerService.getItem('userClaro')).role;
    this.calcGridCalendarParams();
    this.setPlanningGroup();
    this.dataobsservice.dndDropzoneDisabled.subscribe(dndDrop => {
      this.dndDropzoneDisabled = dndDrop;
    });
  }
  
  /*Calcular tamaño de las columnas para 4 dias, el tamaño por hora de un turno 
  y obtengo los dias del navbar de calendario*/
  calcGridCalendarParams() {
    const {widthScreen, columnBtnLicence, columnsDays, dates} = this.sizeParams;
    this.widthScreen = widthScreen;
    this.columnBtnLicence = columnBtnLicence;
    this.columnsDays = columnsDays;
    this.sizeHourTurnCard = columnsDays/24;
    this.dates = dates;
  }
  setPlanningGroup() {
    //Recorro las plantillas
    this.groupPlanning.forEach(planning => {
      planning.turnos = [];
      /* Recorro los rangos horarios de las plantillas para pushear un objeto
      con todos los datos necesarios para un turno  
      */
      planning.type_guardia.rango_hour.forEach((rango, index) => {
        let posicion;
        if(index === 0) {
          posicion = 'primero'
        } else if(index === (planning.type_guardia.rango_hour.length - 1)) {
          posicion = 'ultimo'
        }
        planning.turnos.push({
          posicion,
          dia: null,
          ancho: null,
          desplazar: null,
          idusuario: null,
          id_horario_grupo: planning.id_horario_grupo,
          type_guardia: planning.type_guardia,
          minutos: this.calcDifHours(rango.horario_hasta, rango.horario_desde),
          id_rango_horario: rango.id_rango_horario,
          id_tipoguardia: rango.id_tipoguardia,
          id_grupo: planning.id_grupo,
          horario_desde: rango.horario_desde,
          horario_hasta: rango.horario_hasta,
          rango: rango.horario_desde + " a " + rango.horario_hasta,
          textoLargo: this.userRol === 'invitado' ? 'Turno Vacio' : '+ USUARIO',
          textoCorto: this.userRol === 'invitado' ? 'VACIO' : '+',
        });
      });
    });
    this.setPlanningGroupWidth();
  }
  /*Calculo el tiempo final menos el inicial de los rangos horarios 
  para obtener las horas en minutos*/
  calcDifHours(tiempoFinal: String, tiempoInicial: String): Number {
    if(tiempoFinal === tiempoInicial) {
      return 1440
    } else {
      let tiempoTotal = this.transformRangoToMinute(tiempoFinal) - this.transformRangoToMinute(tiempoInicial);
      if(tiempoTotal < 0) {
        tiempoTotal += 1440
      }
      return tiempoTotal
    }
  }
  transformRangoToMinute(rango) {
    let hora = parseInt(rango.split(":")[0]);
    let minuto = parseInt(rango.split(":")[1]);
    return (hora * 60 + minuto);
  }
  //Recorro los turnos para setearle el ancho
  setPlanningGroupWidth() {
    this.groupPlanning.forEach(planning => {
      planning.turnos.forEach(turno => {
        turno.ancho = this.calcWidthTurn(turno.minutos);
      });
    });
    this.setDaysTurns();
  }
  //Calculo el ancho de los turnos en base a los minutos
  calcWidthTurn(tiempoTotal): Number {
    tiempoTotal = tiempoTotal * (this.sizeHourTurnCard/60);
    return tiempoTotal;
  }
  //El formato de los turnos no tenian dias aqui les agrego
  setDaysTurns() {
    this.groupPlanning.forEach(planning => {
      let nuevosTurnos = [];
      let copiaTurnos = JSON.stringify(planning.turnos);
      this.dates.forEach((date, index) => {
        JSON.parse(copiaTurnos).forEach(turno => {
          /**Agregar logica para solo tomar el ultimo rango de el primer dia(son 6 dias acordate) 
           y los demas turnos hasta el primer rango de el ultimo dia*/
          turno.dia = date.nextDay;
          if(index === 0 && turno.posicion === 'ultimo') {
            nuevosTurnos.push(turno);
          } else if(index === (this.dates.length - 1) && turno.posicion === 'primero') {
            nuevosTurnos.push(turno);
          } else if(index > 0 && index < (this.dates.length - 1)) {
            nuevosTurnos.push(turno);
          }
          else if(turno.horario_desde == turno.horario_hasta && moment('00:30',"HH:mm") < moment(turno.horario_desde,"HH:mm")) {
            nuevosTurnos.push(turno);
          }
        });
      });
      planning.turnos = nuevosTurnos;
    });
    this.setAsignationsTurns();
  }
  //Recorro los turnos para encontrar asignaciones y guardarlas en un solo array
  setAsignationsTurns() {
    this.groupPlanning.forEach((planning, indexGroup) => {
      if(planning.asignation_user_guard_planning.length > 0) {
        planning.asignation_user_guard_planning.forEach(asignation => {
          if(asignation.repetitions_user_asignation.length > 0) {
            this.compareDaysTurnosAsignation(asignation, planning.turnos, indexGroup);
          } else {
            this.calcShiftTurns();
          }
        });
      } else {
        this.calcShiftTurns();
      }
    });
  }

  /*Comparo los turnos con las asignaciones si encuentro le seteo
  nuevos parametros al turno*/
  compareDaysTurnosAsignation(asignation, turnos, indexGroup) {
    asignation.repetitions_user_asignation.forEach(userAsignation => {
      let fullFecha = userAsignation.fecha_desde.split(" ")[0];
      let fullHora = userAsignation.fecha_desde.split(" ")[1];
      let horaMin = fullHora.split(":")[0] + ":" + fullHora.split(":")[1];
      turnos.forEach(turno => {
        if(fullFecha === moment(turno.dia).format("YYYY-MM-DD") && horaMin === turno.rango.split("a")[0].trim()) {
          this.setParamsAsignationTurn(asignation, userAsignation, turno, indexGroup);
        }
      });
    });
    this.reduceTurnosToFourDays();
  }
  //Seteo los nombre cortos y largos de los turnos
  setParamsAsignationTurn(asignation, userAsignation, turno, indexGroup) {
    turno.template_user = userAsignation.template_user;
    turno.idusuario = asignation.user.idusuario;
    turno.textoCorto = asignation.user.apellido.charAt(0).toUpperCase() + asignation.user.nombre.charAt(0).toUpperCase();
    let textoLargo = asignation.user.apellido + ", " + asignation.user.nombre;
    turno.textoLargo = this.titlecaseText(textoLargo);
    turno.colorBg = this.generateColor(indexGroup, turno);
    turno.id_plantilla_usuario = asignation.id_plantilla_usuario;
  }
  /*Tengo un array de 6 dias pero visualmente 
    necesito 4 y un efecto de que hay un turno anterior*/
  reduceTurnosToFourDays() {
    this.groupPlanning.forEach(planning => {
      let copiaTurnos = JSON.stringify(planning.turnos);
      let nuevosTurnos = [];
      JSON.parse(copiaTurnos).forEach(turno => {
        nuevosTurnos.push(turno);
      });
      planning.turnos = nuevosTurnos;
    });
    this.calcShiftTurns();
  }
  //Calculo el desplazamiento si no empiezan a las 0 horas
  calcShiftTurns() {
    this.groupPlanning.forEach(planning => {
      if(parseInt(planning.turnos[0].rango.split(":")[0]) !== 0) {
        let menos24Hs = -1440 * (this.sizeHourTurnCard/60);
        let minutosIniciales = this.transformRangoToMinute(planning.turnos[0].rango.split("a")[0].trim()) * (this.sizeHourTurnCard/60);
        planning.turnos[0].desplazar = minutosIniciales + menos24Hs;
      }
    });
  }
  //Genero colores para los turnos
  generateColor(indexGroup: number, turn) {
    this.countIterationGetColor ++;
    this.turnUser.push({indexGroup, idusuario: turn.idusuario });
    const totalTemplate = COLORS_TEMPLATES.length;
    const i = indexGroup >= totalTemplate ? indexGroup % totalTemplate : indexGroup;
    const totalColor = COLORS_TEMPLATES[i].array_color.length;

    const uniqueArray = this.turnUser.filter((turn, index) => {
      return index === this.turnUser.findIndex(obj => {
        return obj.indexGroup === indexGroup && obj.idusuario === turn.idusuario;
      });
    });

    // remove duplicates from array of turn
    uniqueArray.forEach((t, index) => {
      const indexColor = index >= totalColor ? index % totalColor : index;
      t.bgColor = this.hexToRgb(COLORS_TEMPLATES[i].array_color[indexColor]);
    });

    // filter turn duplicates any add bgColor.
    this.turnUser.filter(t => !t.bgColor).map(item => {
      item.bgColor = this.turnUser.find(t => t.idusuario === item.idusuario && t.indexGroup === indexGroup).bgColor
    });

    return this.turnUser[this.countIterationGetColor].bgColor;
  }

  hexToRgb(hex): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : null;
  }

  backgroundColor(turn): string {
    if( !turn.colorBg  && !this.timeIsAvailable(turn) ) {
      turn.colorBg = '#cdcdcd';
    }
    return turn.colorBg
  }


  titlecaseText(value: string): string {
    return value.toLocaleLowerCase()
      .trim()
      .split(" ")
      .map(item => {
        return item.charAt(0).toUpperCase() + item.slice(1);
      })
      .join(" ");
  }
  /*Funcion que se llama cuando dropean algun guardia sobre un turno 
    que a su vez llama a la funcion que abre el modal de asignacion
  */
  onDrop(event, turno) {
    this.openDialog(turno, event.data);
  }
  
  isAsignableTurn(turno, guardSelected?): Boolean {
   
    if(this.turnAssigningPreviously(turno)) {
      this.openShowDialog(turno);
      return false;
    }
    
    if(this.timeIsAvailable(turno)) {
      return true;
    } 
      
    this.openDialogDisabledTurn();
    return false;
  }

  turnAssigningPreviously(turno): boolean {
    return turno.idusuario ? true : false;
  }

  timeIsAvailable(turnSelected) : boolean {
    const { end } = this.transformInRealDates(turnSelected);    
    const now = moment().toDate();
    return  now <= end;
  }

  transformInRealDates({dia,horario_desde,horario_hasta}){
    return transformStringInDates(dia,horario_desde,horario_hasta);
  }



  openDialog(turno, guardSelected?) {
    
    if(this.userRol == 'guardia' || this.userRol == 'admin-guardia') {
      guardSelected = SessionManagerService.user()
    }
    
    if(!this.isAsignableTurn(turno)) {
      return false;
    }
    if(this.userRol === 'invitado') {
      return false;
    }

    let fechaPlantilla = moment(turno.dia).clone()
    .hours(parseInt(turno.horario_desde.split(":")[0]))
    .minutes(parseInt(turno.horario_desde.split(":")[1]))
    .seconds(0);
    this.showLoadingModal = true;
    this.turnosService.getGroupGuards(turno.id_grupo, fechaPlantilla.format('YYYY-MM-DD HH:mm:ss')).subscribe(res => {
      let guardias = this.checkStatusSelectGuards(res['message'], this.licencias, turno.dia);
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.panelClass = "container-custom-modal";
      dialogConfig.width = "370px";
      let optsDropDownAsignation;
      this.turnosService.dropdownAsignation().subscribe(res => {
        this.showLoadingModal = false;
        optsDropDownAsignation = res['message'];
        dialogConfig.data = { 
          type:'asignar-turno', 
          name: "asignar turno",
          turno,
          guardSelected: guardSelected ? guardSelected : null,
          disabledSelect: guardSelected ? true : false,
          guards: guardias, 
          fechaPlantilla,
          dates: this.dates,
          optsDropDownAsignation
        };
        const dialogRef = this.dialog.open(ModalTurnoComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(asignation => {
          if(asignation) {
            this.router.navigateByUrl(`calendario/${asignation['asignation_user_guard_planning'][0]['id_grupo']}`)
          }
        });
      });
   }, e => console.log(e));
  }

  checkStatusSelectGuards(guardias, licencias, dia) {
    let guardsActive = [];
    let guardsInactive = [];
    guardias.forEach(guardia => {
      guardia.active = this.turnosService.statusGuardsCarousel(guardia, licencias, dia);
      if(guardia.active === 'active') {
        guardsActive.push(guardia);
      } else {
        guardsInactive.push(guardia);
      }
    });
    return [...guardsActive, ...guardsInactive];
  }
  openShowDialog(turno) {
    const dialogConfig = new MatDialogConfig();
    let id_plantilla_usuario = turno.id_plantilla_usuario;
    let fechaPlantilla = moment(turno.dia).clone()
    .hours(parseInt(turno.horario_desde.split(":")[0]))
    .minutes(parseInt(turno.horario_desde.split(":")[1]))
    .seconds(0);
    this.showLoadingModal = true;
    this.turnosService.getGroupGuards(turno.id_grupo, fechaPlantilla.format('YYYY-MM-DD HH:mm:ss')).subscribe(res => {
      let guardias = this.checkStatusSelectGuards(res['message'], this.licencias, turno.dia);
      dialogConfig.disableClose = false;
      dialogConfig.panelClass = "container-custom-modal";
      dialogConfig.width = "370px";
      let optsDropDownAsignation;
      this.turnosService.dropdownAsignation().subscribe(res => {
        this.showLoadingModal = false;
        optsDropDownAsignation = res['message'];
        dialogConfig.data = { 
          id_plantilla_usuario,
          turno,
          guardias,
          fechaPlantilla,
          dates: this.dates,
          optsDropDownAsignation
        };
        const dialogRef = this.dialog.open(ModalShowTurnComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
          //this.turnosService.blockRepeatTurn(id_plantilla_usuario, false).subscribe(res => alert(res['success']));
        });
      });
    });
  }
  openDialogDisabledTurn() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.panelClass = "container-custom-modal";
    dialogConfig.width = "370px";
    const dialogRef = this.dialog.open(ModalDisabledTurnComponent, dialogConfig);
  }
}
