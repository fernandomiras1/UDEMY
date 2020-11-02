import { AfterViewInit, Component, OnDestroy, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import { MatSelect } from '@angular/material/select';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Userguard } from '../../interfaces/guard';
import * as moment from 'moment';
import { TurnosLicenciasService } from '../../services/turnos-licencias.service';
import { GeneralService } from '../../services/general.service';
import { ModalCollisionTurnComponent } from '../modal-collision-turn/modal-collision-turn.component';
import GridNavigation from "../../pages/turnos-licencias/grid-navigation";
import { SessionManagerService } from "../../services/session-manager.service";
import { NotificationsService } from "../../services/notifications/notifications.service";
import { DataObsService } from '@app/services/data-obs.service';

@Component({
  selector: 'app-modal-turno',
  templateUrl: './modal-turno.component.html',
  styleUrls: ['./modal-turno.component.scss']
})
export class ModalTurnoComponent implements OnInit {
  showLoadingModal: Boolean;
  disabledSelect: Boolean;
  typeModal;
  bodyModal;
  fechaPlantilla = moment();
  daysBtns = [
    {
      id: 1,
      txt: 'L',
      fulltxt: 'Lunes',
      active: true
    },
    {
      id: 2,
      txt: 'M',
      fulltxt: 'Martes',
      active: true
    },
    {
      id: 3,
      txt: 'M',
      fulltxt: 'Miércoles',
      active: true
    },
    {
      id: 4,
      txt: 'J',
      fulltxt: 'Jueves',
      active: true
    },
    {
      id: 5,
      txt: 'V',
      fulltxt: 'Viernes',
      active: true
    },
    {
      id: 6,
      txt: 'S',
      fulltxt: 'Sábado',
      active: true
    },
    {
      id: 0,
      txt: 'D',
      fulltxt: 'Domingo',
      active: true
    },
  ];
  nombrePlantilla;
  optsDropDownAsignation;
  rangosHorarios = [];
  dataGuardTurnModal = {
    guard:{},
    repeat: 'Nunca',
    id_dropdown_repeticion: "1",
    idOptsDropDown: null,
    personalizado_cada: [
      {
        cada: '',
        tipo: ''
      }
    ],
    dia_todos_los_meses: [
      {
        dia: ''
      }
    ],
    descripcion: '',
    selectDayCalendar: null,
    dias_repeticion: [],
    turno: null,
    footerRepeatDaysWeek: '',
    footerRepeatDaysMonth: {
      value: '',
      dayNumber: null,
      dayTxt: ''
    }
  }
  dateFilter;
  dates;

  minDate: Date;
  maxDate: Date; 
  licencia = {
    fecha_hasta: null,
    fecha_desde: null,
  };
  errorsMessage = {
    general: false,
    guard: false,
    date: false,
  }
  /** lista de los guardias */
  protected guards: Userguard[];

  public guardCtrl: FormControl = new FormControl();
  public guardFilterCtrl: FormControl = new FormControl();
  public filteredGuards: ReplaySubject<Userguard[]> = new ReplaySubject<Userguard[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>()
  isEdit: boolean;
  id_plantilla_usuario;

  private gridNavigation: GridNavigation;
  private originalUserSelected:any;
  public partialEdition:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalTurnoComponent>,
    public turnosService: TurnosLicenciasService,
    private generalService: GeneralService,
    public dialog: MatDialog,
    private notificationsService: NotificationsService,
    private dataobsservice: DataObsService
  ) {
    this.gridNavigation = new GridNavigation()

    let {id_plantilla_usuario, edit, disabledSelect, type, guards, fechaPlantilla, guardSelected, turno, dates, optsDropDownAsignation, partialEdition} = data;
    //Es para switchear entre los distintos modales
    this.isEdit = edit ? edit : false;
    this.partialEdition = partialEdition;
    this.id_plantilla_usuario = id_plantilla_usuario ? id_plantilla_usuario : false;
    if(data['datosTurno']) {
      turno = data['datosTurno'].turno;
      optsDropDownAsignation = data['datosTurno'].optsDropDownAsignation;
      fechaPlantilla = data['datosTurno'].fechaPlantilla;
      dates = data['datosTurno'].dates;
      guards.forEach(guard => {
        if(this.partialEdition && SessionManagerService.user().id_usuario == guard.id_usuario) {
          this.dataGuardTurnModal.guard = guard;
          this.errorsMessage.general = true;
        }
        else if(!this.partialEdition && data.id_usuarioSelected == guard.id_usuario) {
          this.dataGuardTurnModal.guard = guard;
          this.errorsMessage.general = true;
        }
      });
    } else {
      //Esta variable setea cuando se dropea un guardia en un turno
      this.dataGuardTurnModal.guard = guardSelected;
      this.errorsMessage.general = true;
    }
    this.typeModal = type;
    if(this.typeModal === 'asignar-turno') {
      this.disabledSelect = disabledSelect;
      //Esta fecha es la seleccionada del turno
      this.fechaPlantilla = fechaPlantilla;
      this.guards = guards;
      //Tiene los datos del tipo de guardia por ejemplo Guardia Activa 8hs | 03:00 a 11:00
      this.bodyModal = turno.type_guardia;
      //this.dataGuardTurnModal.selectDayCalendar = new Date(fechaPlantilla);
      this.dataGuardTurnModal.turno = turno;
      this.dates = dates;
      this.nombrePlantilla = turno.type_guardia.nombre_tipo_de_guardia;
      this.optsDropDownAsignation = optsDropDownAsignation;
      this.dataGuardTurnModal.idOptsDropDown = JSON.parse(JSON.stringify(optsDropDownAsignation[0].id_dropdown));
      this.rangoSelectedGuard(turno['type_guardia']['rango_hour'], turno['id_rango_horario']);
      //Se van a desabilitar las fechas hasta la primera del navbar calendario
      //this.minDate = new Date(this.dates[1].nextDay);
      this.minDate = new Date(fechaPlantilla);
      let maxDay = new Date(this.dates[1].nextDay);
      this.maxDate = new Date(maxDay.setMonth(maxDay.getMonth() + 4))
    } else if(this.typeModal === 'editar-turno') {
      this.guards = guards;
    }

    this.setOriginalUserBeforeEdit(this.dataGuardTurnModal.guard);

  }

  ngOnInit() {
    
    this.dialogRef.updatePosition({ top: `20px` });
    if(this.typeModal === 'asignar-turno') {
      // set initial selection
      this.guardCtrl.setValue(this.guards);
  
      this.highlightSupervisor()

      // load the initial guard list
      this.filteredGuards.next(this.guards.slice());
  
      // listen for search field value changes
      this.guardFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterGuards();
      });
    }    

  }

  get selectDisabled() {

    if(this.partialEdition) {
      return true;
    }

    if(this.disabledSelect){
      return true;
    }

    return false;
  }

  highlightSupervisor() {
    if(this.isSupervisor()) {
      let user_id = SessionManagerService.user().id_usuario;
      let guard = this.findSupervisor(user_id);
      this.setSupervisorAtBeginning(guard.supervisor,guard.index) 
    }
  }

  isSupervisor(){
    if(SessionManagerService.user().role = 'jefe-guardia') {
      return true;
    }
    return false
  }

  findSupervisor(supervisor_id){
    let index;
    let supervisor = this.guards.find((guard,i) => {
      if(guard.id_usuario == supervisor_id) {
        guard['statusClass'] = 'txt-color-claro';
        index = i;
        return guard;
      }
    })
    return { supervisor, index }
  }

  setSupervisorAtBeginning(supervisor,index) {
    if(supervisor) {
      this.guards.splice(index,1)
      this.guards = [supervisor].concat(this.guards)
    }
  }


  closeModal() {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  showErrorGuard() {
    if(!this.dataGuardTurnModal.guard) {
      this.errorsMessage.guard = true;
    } else {
      this.errorsMessage.guard = false;
    }
  }
  showErrorDate() {
    if(!this.dataGuardTurnModal.selectDayCalendar) {
      this.errorsMessage.date = true;
      this.errorsMessage.general = false;
    } else {
      this.errorsMessage.general = true;
      this.errorsMessage.date = false;
    }
  }
  /**
   * Sets the initial value after the filteredGuards are loaded initially
   */
  protected setInitialValue() {
    this.filteredGuards
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Userguard, b: Userguard) => a && b && a['id_usuario'] === b['id_usuario'];
      });
  }

  rangoSelectedGuard(rangos, idRango) {
    rangos.forEach(rango => {
      rango.selected = false;
    });
    let rango = rangos.find(rango => rango.id_rango_horario == idRango);
    rango.selected = true;
    this.rangosHorarios = rangos;
  }

  changeRangoSelectedGuard(idRango) {
    this.rangosHorarios.forEach(rango => {
      if(rango.id_rango_horario === idRango) {
        rango.selected = true;
        let formatWithRangoHour = moment(this.dataGuardTurnModal.turno.dia).clone();
        formatWithRangoHour.hour(parseInt(rango.horario_desde.split(":")[0]))
        .minutes(parseInt(rango.horario_desde.split(":")[1]))
        .seconds(0);
        this.dataGuardTurnModal.turno.dia = formatWithRangoHour;
      } else {
        rango.selected = false;
      }
    });
  }

  protected filterGuards() {
    if (!this.guards) {
      return;
    }
    // Busca la palabra seleccionada
    let search = this.guardFilterCtrl.value;
    if (!search) {
      this.filteredGuards.next(this.guards.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // Filtra los guardias
    this.filteredGuards.next(
      this.guards.filter(guard => guard['apellido_usuario'].toLowerCase().indexOf(search) > -1)
    );
  }

  selectTypeRepeat(e) {

    const repetitions = {
        1:"Nunca",
        2:"Todos los dias",
        3:"Todas las semanas",
        4:"Todos los meses",
        5:"Personalizado",
    }

    this.dataGuardTurnModal.selectDayCalendar = null;
    this.dataGuardTurnModal.idOptsDropDown = e.value;
    this.dataGuardTurnModal.id_dropdown_repeticion = e.value;
    this.dataGuardTurnModal.dias_repeticion = [];
    this.dataGuardTurnModal.footerRepeatDaysMonth.value = '';
    this.dataGuardTurnModal.personalizado_cada[0].tipo = '';
    this.dataGuardTurnModal.personalizado_cada[0].cada = '';
    let repetitionID = this.dataGuardTurnModal.idOptsDropDown

    switch(repetitions[repetitionID]){
      case "Nunca":
        this.errorsMessage.general = true;
      break;

      case "Todos los dias":
        this.daysBtns.forEach(btn => {
          this.dataGuardTurnModal.dias_repeticion.push(btn.fulltxt);
          btn.active = true;
        });
        this.txtRepeatDays();
      break;

      case "Todas las semanas":
        this.daysBtns.forEach(btn => {
          if(this.fechaPlantilla.day() !== btn.id) {
            btn.active = false;
            if(btn.active) {
              this.dataGuardTurnModal.dias_repeticion.push(btn.fulltxt);
            }
          } else {
            if(btn.active) {
              this.dataGuardTurnModal.dias_repeticion.push(btn.fulltxt);
            }
            this.txtRepeatDays();
          }
        });
      break;

      case "Todos los meses":
        this.monthOptionTurnModal();
      break;

      case "Personalizado":
        this.dataGuardTurnModal.personalizado_cada[0].tipo = 'días';
        this.dataGuardTurnModal.personalizado_cada[0].cada = '2';
      break;

      default:
        this.errorsMessage.general = false;
      break;
    }

  }

  pushDayRepetition(e) {
    this.dataGuardTurnModal.dias_repeticion = [];
    if(e.value === 'semanas') {
      this.daysBtns.forEach(btn => {
        if(this.fechaPlantilla.day() !== btn.id) {
          btn.active = false;
        } else {
          this.dataGuardTurnModal.dias_repeticion.push(btn.fulltxt);
          this.txtRepeatDays();
        }
      });
    }
  }

  checkOneDayActive(): number {
    let count = 0;
    this.daysBtns.forEach(btn => {
      if(btn.active) {
        count++;
      }
    });
    return count;
  }

  changeDayActive(day) {
    day.active = !day.active;
    this.updateArrayDataGuardTurnModal();

    if(this.fechaPlantilla.day() != day.id && false) {
      day.active = !day.active;
      this.updateArrayDataGuardTurnModal();
      //this.txtRepeatDays();
    }
  }

  updateArrayDataGuardTurnModal() {
    
    this.dataGuardTurnModal.dias_repeticion = [];
   
    this.daysBtns.forEach(btn => {
      if(btn.active) {
        this.dataGuardTurnModal.dias_repeticion.push(btn.fulltxt);
      }
    });

    if(this.dataGuardTurnModal.idOptsDropDown != '5') {
      const daysSelected:number = this.dataGuardTurnModal.dias_repeticion.length;
      if(daysSelected == 7) {
        this.dataGuardTurnModal.idOptsDropDown = '2';
        this.errorsMessage.general = true;
      }
      else if(daysSelected == 0) {
        this.errorsMessage.general = false;
      }
      else{
        this.dataGuardTurnModal.idOptsDropDown = '3';
        this.errorsMessage.general = true;
      }
    }

  }

  openDatePicker(picker): void {
    const repetitionID = this.dataGuardTurnModal.idOptsDropDown;
    const daysSelected:number = this.dataGuardTurnModal.dias_repeticion.length;
    if(daysSelected > 0 || repetitionID == '5') {
      picker.open()
    }
  }

  monthOptionTurnModal() {
    this.dataGuardTurnModal.footerRepeatDaysMonth.dayNumber = "El día " + this.fechaPlantilla.clone().format("D") + " de cada mes";
    this.dataGuardTurnModal.footerRepeatDaysMonth.value = this.dataGuardTurnModal.footerRepeatDaysMonth.dayNumber;
    let prefixes = ['primer', 'segundo', 'tercer', 'cuarto', 'quinto'];
    let mensaje_semana_mes = "El " + prefixes[Math.floor(this.fechaPlantilla.date() / 7)] + ' ' +  this.generalService.titlecase(this.fechaPlantilla.clone().locale('es').format("dddd")) + " de cada mes";
    this.dataGuardTurnModal.footerRepeatDaysMonth.dayTxt = mensaje_semana_mes;
  }

  txtRepeatDays() {
    let finded = this.daysBtns.find(btn => btn.active === false);
    if(finded) {
      if(this.dataGuardTurnModal.dias_repeticion.length == 1) {
        this.dataGuardTurnModal.footerRepeatDaysWeek = `Todas las semanas los días ${this.dataGuardTurnModal.dias_repeticion[0]}.`;
      } else {
        this.dataGuardTurnModal.footerRepeatDaysWeek = `Todas las semanas, `;
        this.dataGuardTurnModal.dias_repeticion.forEach((day, index) => {
          if(index == (this.dataGuardTurnModal.dias_repeticion.length - 1)) {
            this.dataGuardTurnModal.footerRepeatDaysWeek += day + ".";
          } else {
            this.dataGuardTurnModal.footerRepeatDaysWeek += day + ",";
          }
        });
      }
    } else {
      this.dataGuardTurnModal.footerRepeatDaysWeek = `Todos los días de la semana.`;
      this.dataGuardTurnModal.idOptsDropDown = '2';
    }
  }

  selectGuardChange() {
    this.showErrorGuard();
    this.errorsMessage.general = true;
    if (this.dataGuardTurnModal.guard['license'][0]) {
      this.licencia.fecha_desde = this.dataGuardTurnModal.guard['license'][0]['fecha_desde'];
      this.licencia.fecha_hasta = this.dataGuardTurnModal.guard['license'][0]['fecha_hasta'];
    } else {
      this.licencia.fecha_desde = null;
    }
  }
  /*Pinta los dias del calendario en base a la condicion de si tiene una licencia
    y setea una nueva fecha maxima para bloquear los dias siguientes
  */
  dateClass = (d: Date) => {
    if(this.licencia.fecha_desde) {
      let restarDia = new Date(this.licencia.fecha_desde)
      restarDia.setDate(restarDia.getDate() - 1);
      this.maxDate = new Date(restarDia);
      return this.generalService.overlappedDate(d, d, this.licencia.fecha_desde, this.licencia.fecha_hasta) ? 'highlight-dates' : undefined;
    } else {
      return undefined;
    }
  }

  confirmAsingGuard() {
    if(this.errorsMessage.general){
      if(this.dataGuardTurnModal.guard) {
        if(this.dataGuardTurnModal.idOptsDropDown != '1' && this.dataGuardTurnModal.selectDayCalendar) {
          this.formatDateRepeat(false);
        } else if(this.dataGuardTurnModal.idOptsDropDown == '1') {
          this.formatDateRepeat(true);
        } else {
          this.showErrorDate();
        }
      } else {
        this.showErrorGuard();
      }
    };
  }

  formatDateRepeat(isNeverRepeat: boolean) {
    this.rangosHorarios.forEach(rango => {
      if(rango.selected) {
        let formatWithRangoHour = moment(this.dataGuardTurnModal.turno.dia).clone();
        formatWithRangoHour.hour(parseInt(rango.horario_desde.split(":")[0]))
        .minutes(parseInt(rango.horario_desde.split(":")[1]))
        .seconds(0);
        this.dataGuardTurnModal.turno.dia = formatWithRangoHour;
        if(isNeverRepeat) {
          let formatWithRangoHourNever = moment(this.fechaPlantilla).clone();
          formatWithRangoHourNever.hour(parseInt(rango.horario_desde.split(":")[0]))
          .minutes(parseInt(rango.horario_desde.split(":")[1]))
          .seconds(0);
          this.dataGuardTurnModal.selectDayCalendar = formatWithRangoHourNever;
        }
        this.asingGuard();
      }
    });
  }

  asingGuard() {
    const guard = this.dataGuardTurnModal.guard;
    this.showLoadingModal = true;
      this.turnosService.checkCollisions(this.dataGuardTurnModal).subscribe(res => {
        this.showLoadingModal = false;
        let response = res['message'];
        
        if(response.collisions) {
          if(this.isEdit && response.collisions.length == 0) {
            this.editAssignedGuard(response);
            this.editedGuardNotification(guard);
          } else if(response.collisions.length > 0) {
            this.openDialogCollisions(response);
          } else {
            this.assignedGuardWithoutCollisions()
            this.notification(guard,'create');
          }
        }
      });
  }

  editAssignedGuard(message:string) {
    this.turnosService.updateAsignGuard(this.dataGuardTurnModal, this.id_plantilla_usuario).subscribe(res => {
      if(message) {
        this.dialogRef.close(message);
        this.dataobsservice.refreshGrid.emit();
      }
    });
  }

  openDialogCollisions(collision) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = "container-custom-modal";
    dialogConfig.id = "modal-component-collisions";
    dialogConfig.width = "700px";
    dialogConfig.data = { 
      collision,
      item: this.dataGuardTurnModal
    };
    const dialogRef = this.dialog.open(ModalCollisionTurnComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(() => {
        this.dialogRef.close();
      });
  }

  assignedGuardWithoutCollisions() {
    this.turnosService.asignGuard(this.dataGuardTurnModal).subscribe(res => {
      if(res['success']) {
        this.showLoadingModal = false;
        this.dialogRef.close(res['message']);
        this.dataobsservice.refreshGrid.emit();
      }
    });
  }

  editedGuardNotification(guard) {
    if(this.isSameUserAfterEdit(guard)) {
      this.notification(guard,'update');
    }
    else {
      this.notification(guard,'create')
      this.notification(this.originalUserSelected,'delete')
    }
    this.dataobsservice.refreshGrid.emit();
  }
  
  notification(guard:any,action:string) {

    const date = moment().format('DD/MM/YYYY HH:mm');

    const message = {
      create:'se le asignaron guardias el dia ' + date,
      update:'se modificaron guardias el dia ' + date,
      delete:'se eliminaron guardias el dia ' + date
    }

    let {id_usuario, nombre_usuario , apellido_usuario} = guard;

    if(nombre_usuario == undefined || apellido_usuario == undefined) {
      nombre_usuario = guard.nombre;
      apellido_usuario = guard.apellido;
    }

    this.notificationsService.send({
      idususol:SessionManagerService.user().id_usuario,
      idusurecep:id_usuario,
      mensaje:`${apellido_usuario}, ${nombre_usuario} ${message[action]}`
    })
    .subscribe(
      response => console.log(response),
      error => console.log('Error:',error)
    )
  }


  setOriginalUserBeforeEdit(user) {
    if(user) {
      const {id_usuario, nombre_usuario, apellido_usuario} = user;
      this.originalUserSelected = {id_usuario, nombre_usuario, apellido_usuario};
    }
  }

  isSameUserAfterEdit(guard) {
    return this.originalUserSelected.id_usuario == guard.id_usuario;
  }

}
