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
import { getUserByIdFromCollisions, IDguardsReplaced } from '@app/utils/collision.notifications';
import { hasIntersection } from '@app/utils/intersection.array';
import { ProfileService } from '@app/services/profile.service';
import { SigosService } from '@app/services/sigos/sigos.service';

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
  fechaPlantilla;
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
    dia_todos_los_meses:[],
    descripcion: '',
    selectDayCalendar: null,
    dias_repeticion: [],
    turno: null,
    footerRepeatDaysWeek: '',
    footerRepeatDaysMonth: {
      value: '',
      dayNumber: null,
      dayTxt: '',
      number:null,
      check1:true,
      check2:false
    }
  }
  dateFilter;
  dates;
  grupal:boolean;
  grupalInfo;

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
    private dataobsservice: DataObsService,
    private sigosService: SigosService
  ) {
    this.gridNavigation = new GridNavigation()
    this.fechaPlantilla = moment();
    let {
      id_plantilla_usuario, 
      edit, 
      disabledSelect, 
      type, 
      guards, 
      fechaPlantilla, 
      guardSelected, 
      turno, 
      dates, 
      optsDropDownAsignation, 
      partialEdition,
      grupal,
      grupalInfo,
    } = data;
    this.typeModal = type;
    if ( data.type === 'customized') {
      return;
    }
    this.grupal = grupal;
    this.grupalInfo = grupalInfo;
    //Es para switchear entre los distintos modales
    this.isEdit = edit ? edit : false;
    this.partialEdition = partialEdition;
    this.id_plantilla_usuario = id_plantilla_usuario ? id_plantilla_usuario : false;
    let repetitionID = '1';

    if(data['datosTurno']) {
      turno = data['datosTurno'].turno;
      repetitionID = turno.template_user.rules_repetition.id_repeticion
      optsDropDownAsignation = data['datosTurno'].optsDropDownAsignation;
      fechaPlantilla = data['datosTurno'].fechaPlantilla;
      dates = data['datosTurno'].dates;
      this.setDefaultDayForCalendar(turno, repetitionID);
      this.setDefaultDaysSelectedForRepetitions(turno, repetitionID);
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
      this.dataGuardTurnModal.idOptsDropDown = repetitionID;
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
    this.setDefaultDayForMonthRepetitions(repetitionID);
    this.setDefaultCheckForMonthRepetitions(turno, repetitionID);
    this.setDefaultSelectForCustomRpetitions(turno, repetitionID);
    this.setWithoutRepetitionIfItIsGuard(turno);
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

  
  setWithoutRepetitionIfItIsGuard(turn){
    if(this.turnOpenedByAnotherGuard(turn)) {
      this.dataGuardTurnModal.idOptsDropDown = '1';
    }
  }

  setDefaultDayForCalendar(turn, repetitionID){
    if(repetitionID != null && repetitionID != '1' && "template_user" in turn){
      this.dataGuardTurnModal.selectDayCalendar = turn.template_user.fecha_repeticion_hasta;
    }
  }

  setDefaultDaysSelectedForRepetitions(turn, repetitionID){

    if(['2', '3','5'].includes(repetitionID) && "template_user" in turn){

      if(turn.template_user.rules_repetition.dias_repeticion)
      {
        const daysOfWeek = turn.template_user.rules_repetition.dias_repeticion.split(',');
        
        this.dataGuardTurnModal.dias_repeticion = daysOfWeek;
    
        this.daysBtns.filter(btn => !daysOfWeek.includes(btn.fulltxt)).forEach(btn => btn.active = false);
      }
    }
  }

  setDefaultDayForMonthRepetitions(repetitionID){
    if(['4'].includes(repetitionID)){
        this.monthOptionTurnModal()
    }
  }

  setDefaultCheckForMonthRepetitions(turn, repetitionID){
    if("template_user" in turn && ['4'].includes(repetitionID)){
      const rule = JSON.parse(turn.template_user.rules_repetition.regla)[0];
      if(rule.dia == 'asignado'){
        this.dataGuardTurnModal.footerRepeatDaysMonth.check1 = false;
        this.dataGuardTurnModal.footerRepeatDaysMonth.check2 = true;
      }
      else{
        this.dataGuardTurnModal.footerRepeatDaysMonth.check2 = true;
        this.dataGuardTurnModal.footerRepeatDaysMonth.check2 = false;
      }
    }
  }

  setDefaultSelectForCustomRpetitions(turn, repetitionID){
    if("template_user" in turn && ['5'].includes(repetitionID)){
      const rule = JSON.parse(turn.template_user.rules_repetition.regla)[0];
      this.dataGuardTurnModal.personalizado_cada = [rule];

      if(rule.tipo == "semanas") {
        const daysOfWeek = turn.template_user.rules_repetition.dias_repeticion.split(',');
        this.daysBtns.filter(btn => !daysOfWeek.includes(btn.fulltxt)).forEach(btn => btn.active = false);
      }

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
    if(SessionManagerService.user().role == 'jefe-guardia') {
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

  get getDisabledEffect():boolean 
  {
    return this.phoneNotValidated() || !this.errorsMessage.general || (!this.grupal && !this.dataGuardTurnModal.guard)
  }


  closeModal() {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    if(!this.grupal)
    {
      this.setInitialValue();
    }
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
    const daysSelected:number = this.dataGuardTurnModal.dias_repeticion.length;
    const option:string = this.dataGuardTurnModal.idOptsDropDown;
    if(daysSelected > 0 || ['4','5'].includes(option)) {
      picker.open()
    }
    
  }

  monthOptionTurnModal() {
    this.dataGuardTurnModal.footerRepeatDaysMonth.number = this.fechaPlantilla.clone().format("D");
    this.dataGuardTurnModal.footerRepeatDaysMonth.dayNumber = "El día " + this.fechaPlantilla.clone().format("D") + " de cada mes";
    this.dataGuardTurnModal.footerRepeatDaysMonth.value = this.dataGuardTurnModal.footerRepeatDaysMonth.dayNumber;
    let prefixes = ['primer', 'segundo', 'tercer', 'cuarto', 'quinto'];
    let mensaje_semana_mes = "El " + prefixes[Math.floor(this.fechaPlantilla.date() / 7)] + ' ' +  this.generalService.titlecase(this.fechaPlantilla.clone().locale('es').format("dddd")) + " de cada mes";
    this.dataGuardTurnModal.footerRepeatDaysMonth.dayTxt = mensaje_semana_mes;
    
    this.dataGuardTurnModal.dia_todos_los_meses = [{dia: this.dataGuardTurnModal.footerRepeatDaysMonth.number}];
    this.dataGuardTurnModal.descripcion = this.dataGuardTurnModal.footerRepeatDaysMonth.dayNumber;
 
  }

  
  optionMonth(option){
    if(option == 1){
      this.dataGuardTurnModal.dia_todos_los_meses = [{dia: this.dataGuardTurnModal.footerRepeatDaysMonth.number}];
      this.dataGuardTurnModal.descripcion = this.dataGuardTurnModal.footerRepeatDaysMonth.dayNumber;
    }
    else{
      this.dataGuardTurnModal.dia_todos_los_meses = [{dia:'asignado'}];
      this.dataGuardTurnModal.descripcion = this.dataGuardTurnModal.footerRepeatDaysMonth.dayTxt;
    }
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
    if(!this.errorsMessage.general) return null;

    if(this.grupal)
    {
      this.confirmGrupalAssignation();
    }
    else if(this.dataGuardTurnModal.guard && !this.phoneNotValidated())
    {
      this.confirmNormalAssignation();
    }
    else 
    {
      this.showErrorGuard();
    }
  }

  confirmGrupalAssignation():void
  {
    if(this.dataGuardTurnModal.idOptsDropDown != '1' && this.dataGuardTurnModal.selectDayCalendar) {
      this.formatDateRepeat(false);
      this.assignGroup();
    } else if(this.dataGuardTurnModal.idOptsDropDown == '1') {
      this.formatDateRepeat(true);
      this.assignGroup();
    } else {
      this.showErrorDate();
    }
  }

  confirmNormalAssignation(): void
  {
    if(this.dataGuardTurnModal.idOptsDropDown != '1' && this.dataGuardTurnModal.selectDayCalendar) {
      this.formatDateRepeat(false);
      this.assignGuard();
    } else if(this.dataGuardTurnModal.idOptsDropDown == '1') {
      this.formatDateRepeat(true);
      this.assignGuard();
    } else {
      this.showErrorDate();
    }
  }

  formatDateRepeat(isNeverRepeat: boolean):void {
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
      }
    });
  }

  assignGroup()
  {
    this.showLoadingModal = true;
    const inicio = moment(this.dataGuardTurnModal.turno.dia);
    const calendar = moment(this.dataGuardTurnModal.selectDayCalendar).format("YYYY-MM-DD")
    const hasta = moment(calendar + ' ' + inicio.format('HH:mm:ss')).format("YYYY-MM-DD HH:mm:ss");

    const data = {
      id_user: SessionManagerService.user().id_usuario,
      id_plantilla_tipo_guardia: this.dataGuardTurnModal.turno.id_tipoguardia,
      id_horario_grupo:this.dataGuardTurnModal.turno.id_horario_grupo,
      fecha_inicio:inicio.format("YYYY-MM-DD HH:mm:ss"),
      fecha_repeticion_hasta:hasta,
      fecha_repeticion_hasta_real:hasta,
      id_rango_horario:this.dataGuardTurnModal.turno.id_rango_horario,
      id_dropdown_repeticion:this.dataGuardTurnModal.idOptsDropDown,
      id_grupo:this.dataGuardTurnModal.turno.id_grupo,
      descripcion:this.dataGuardTurnModal.descripcion,
      dias_repeticion:this.dataGuardTurnModal.dias_repeticion.join(','),
      dia_todos_los_meses:this.dataGuardTurnModal.dia_todos_los_meses,
      personalizado_cada:this.dataGuardTurnModal.personalizado_cada,
      programacion_grupal: true,
    };

    let request, action;

    if(this.isEdit) 
    {
      data['id_plantilla_grupo'] = this.dataGuardTurnModal.turno.template_user.id_plantilla_grupo; 
      request = this.turnosService.updateAssignGroup(data);
      action = 'update';
    }
    else
    {
      request =  this.turnosService.assignGroup(data);
      action = 'create';
    }

    request.subscribe((res) => {
      this.showLoadingModal = false;
      this.dialogRef.close(res['message']);
      this.dataobsservice.refreshGrid.emit();
      this.notificationGrupal(action);
    });
   
  }

  assignGuard() {
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

            let totalCollisions = 0;

            for(let col of response.collisions) {
              totalCollisions += col.values.length;
            }

            if((this.turnOpenedByAnotherGuard(this.dataGuardTurnModal.turno) || this.turnOpenedByABoss(this.dataGuardTurnModal.turno)) && totalCollisions >= 1 && this.collisionWithSameTurn(response)) {
              this.resolveCollision(response);
            }
            else{
              this.openDialogCollisions(response);
            }
          } else {
            this.assignedGuardWithoutCollisions()
            this.notification(guard,'create');
          }
        }
    });
  }

  collisionWithSameTurn(response): boolean {
    return this.dataGuardTurnModal.turno.id_plantilla_usuario == response.collisions[0].values[0].previous_user.id_plantilla_usuario;
  }

  resolveCollision(collisions){
  
    collisions = this.setCheckedByDefault(collisions);

    const responseRequestData = {
      id_user_asignado: this.dataGuardTurnModal.guard['id_usuario'],
      id_user: SessionManagerService.user().id_usuario,
      id_plantilla_tipo_guardia:this.dataGuardTurnModal.turno.id_tipoguardia,
      id_horario_grupo:this.dataGuardTurnModal.turno.id_horario_grupo,
      fecha_inicio:moment(this.dataGuardTurnModal.turno.dia).format("YYYY-MM-DD HH:mm:ss"),
      fecha_repeticion_hasta:moment(this.dataGuardTurnModal.selectDayCalendar).format("YYYY-MM-DD HH:mm:ss"),
      id_rango_horario:this.dataGuardTurnModal.turno.id_rango_horario,
      id_dropdown_repeticion:this.dataGuardTurnModal.id_dropdown_repeticion,
      id_grupo:this.dataGuardTurnModal.turno.id_grupo,
      descripcion:this.dataGuardTurnModal.descripcion,
      dias_repeticion:this.dataGuardTurnModal.dias_repeticion.join(','),
      dia_todos_los_meses:this.dataGuardTurnModal.dia_todos_los_meses,
      personalizado_cada:this.dataGuardTurnModal.personalizado_cada,
      solucion_colisiones:this.mapCollisions(collisions)
    }
    
    this.turnosService.confirmCollisions(responseRequestData)
    .subscribe(() => {
      this.prepareNotifications(this.dataGuardTurnModal.guard, collisions, 'collision_user',responseRequestData.solucion_colisiones)
      this.dialogRef.close();
      this.dataobsservice.refreshGrid.emit();
    });

  }

  prepareNotifications(currentUser,collisions,selection,solutions){
    this.sendNotificacionAssignedToNewGuard(currentUser,selection);
    this.sendNotificationToReplacedUsers(currentUser.id_usuario,selection,solutions,collisions);
  }

  sendNotificacionAssignedToNewGuard(currentUser, selection) {
    if(selection != 'previous_user') {
      const {id_usuario, nombre_usuario, apellido_usuario} = currentUser;
      this.notification({id_usuario, nombre_usuario , apellido_usuario}, 'create');
    }
  }

  sendNotificationToReplacedUsers(currentUserID, selection, solutions, collisions) {
    const IDreplaced = IDguardsReplaced(currentUserID,selection,solutions);
    IDreplaced.forEach(id => {
      const {id_user:id_usuario, nombre:nombre_usuario, apellido:apellido_usuario} = getUserByIdFromCollisions(id,collisions.collisions);
      this.notification({id_usuario, nombre_usuario , apellido_usuario}, 'delete');
    })
  }

  setCheckedByDefault(collisions) {
    for( let colissionByMonth of collisions.collisions ) {
      for(let colission of colissionByMonth.values) {
        colission.collision_user['checked'] = true;
        colission.previous_user['checked'] = false;
      }
    }

    return collisions;
  }

  mapCollisions(collisions){

    let solutions = [];

    for( let colissionByMonth of collisions.collisions ) {
      for(let colission of colissionByMonth.values) {
        solutions.push({
          id_repeticion:colission.previous_user.id_repeticion,
          id_plantilla_usuario:colission.previous_user.id_plantilla_usuario,
          id_previus_user:colission.previous_user.data_user.id_user,
          id_asignation_user_update:Object.values(colission).find(c => c['checked'])['data_user'].id_user.toString(),
          fecha_desde:colission.previous_user.fecha_desde,
          fecha_hasta:colission.previous_user.fecha_hasta,
          eliminar_previo: !colission.previous_user.checked
        });
      }
    }
    return solutions;
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

    const message = this.notificationActions(action);

    let {id_usuario, nombre_usuario , apellido_usuario} = guard;

    if(nombre_usuario == undefined || apellido_usuario == undefined) {
      nombre_usuario = guard.nombre;
      apellido_usuario = guard.apellido;
    }

    this.notificationsService.send({
      idususol:SessionManagerService.user().id_usuario,
      idusurecep:id_usuario,
      mensaje:`${apellido_usuario}, ${nombre_usuario} ${message}`
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

  notificationGrupal(action) {
    const { lista_distribucion } = this.grupalInfo;
    const { id_usuario, nombre, apellido} = SessionManagerService.user()
    const message = `${apellido} ${nombre} ${this.notificationActions(action)}`;
    this.notificationsService.send({
      idususol:id_usuario,
      email: lista_distribucion,
      mensaje: message
    })
    .subscribe(resu => console.log('resuNotification:', resu))
  }

  notificationActions(action:string): string
  {
    const date = moment().format('DD/MM/YYYY HH:mm');
    const message = {
      create:'se le asignaron guardias el dia ' + date,
      update:'se modificaron guardias el dia ' + date,
      delete:'se eliminaron guardias el dia ' + date
    }
    return message[action];
  }

  isSameUserAfterEdit(guard) {
    return this.originalUserSelected.id_usuario == guard.id_usuario;
  }

  turnOpenedByAnotherGuard(turn){
    const userLogged = SessionManagerService.user();
    
    if(userLogged.role == 'guardia' && userLogged.id_usuario != String(turn.idusuario)) {
      return true;
    }

    return false;

  }

  turnOpenedByABoss(turn){
    const userLogged = SessionManagerService.user();
    
    if(['jefe', 'jefe-guardia', 'admin-jefe'].includes(userLogged.role)) {
      return true;
    }

    return false;

  }


  phoneNotValidated(): boolean
  {
    if(this.grupal) return false;

    return this.sigosService.phoneNotValidated();
  }

}
