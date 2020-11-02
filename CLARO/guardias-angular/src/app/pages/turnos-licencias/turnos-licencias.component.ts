import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralService } from '@app/services/general.service';
import { DataObsService } from '@app/services/data-obs.service';
import { TurnosLicenciasService } from '@app/services/turnos-licencias.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { PermissionsService } from '../../services/permissions.service';
import { SessionManagerService } from '../../services/session-manager.service';
import GridNavigation from './grid-navigation'
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MODE_SELECT_TIME } from '@app/utils/common.enum';

@Component({
  selector: 'app-turnos-licencias',
  templateUrl: './turnos-licencias.component.html',
  styleUrls: ['./turnos-licencias.component.scss']
})
export class TurnosLicenciasComponent implements OnInit, OnDestroy {
  
  public idGrupoParam: string = "";
  public selecType: typeof MODE_SELECT_TIME = MODE_SELECT_TIME;
  eventEmitterUnsuscribe: Subscription[] = [];
  //Vista dia calendario
  seletTimeCalendar = SessionManagerService.getItem('selecTime') || this.selecType.DAYS;
  //Dia seleccionado desde el calendario del navbar
  dateSelected;
  //Observable de la data que viene del server
  obsPlaningCalendar;
  //Skeleton del los grupos del calendario
  showSkeleton: boolean;
  //Array donde se guardaran los dias del navbar del calendario
  dates = [];
  //Objeto donde seteo los dias para 4 o para 2 semanas
  timeCalendar = {
    fourDays: {
      value: 6,
      days: []
    },
    twoWeeks: {
      value: 16,
      days: []
    },
  }

  only_my_groups:string;
  //Dia de hoy
  today = new Date();
  //Array con los grupos
  groupList;
  //Array de las licencias
  licences;
  //Variables para calcular tamaño columnas para 4 dias
  widthScreen;
  columnBtnLicence;
  columnsDays;
  sizeParams;
  allowedRole: boolean;
  guardLoged;
  private gridNavigation: GridNavigation
  daysDivider = {offset:0, day:0 };

  constructor(public generalService: GeneralService,
              private dataobsservice: DataObsService,
              private turnosService: TurnosLicenciasService,
              private permissionsService: PermissionsService,
              private route: ActivatedRoute,
              public dialog: MatDialog,) {
                //Variable donde se almacena el ancho total de la pantalla
                this.widthScreen = this.generalService.widthScreen
                this.gridNavigation = new GridNavigation();
              }

  ngOnInit(): void {
    this.init()
  }

  getDataWithParameters(){
    this.getDate(this.timeCalendar[this.seletTimeCalendar]);
  }

  init(): void {
    this.route.queryParams.subscribe(params => {
      if(params['id_grupo']) {
        this.idGrupoParam = params['id_grupo'];
        this.only_my_groups = "0";
      }
    });
   
    this.calcWidthColumn(this.seletTimeCalendar);

    this.eventEmitterUnsuscribe.push(this.dataobsservice.date.subscribe(date => {
      //Seteo el dia del calendario del navbar
      //this.dateSelected = moment(date).subtract(1, 'day');
      //Creo el array del los dias
      let calendarDayStorage = this.gridNavigation.getFromStorage().calendar_day
      if(calendarDayStorage['redirect']) {
        this.dateSelected = moment(calendarDayStorage['day'])
        this.gridNavigation.restartDay()
      }
      else {
        this.dateSelected = moment(date).subtract(1, 'day');
      }
      this.gridNavigation.registerNavigationDay(this.dateSelected.toDate())
      this.getDataWithParameters()
    }));

    this.eventEmitterUnsuscribe.push(this.dataobsservice.selectTimeCalendar.subscribe(param => {
      //Seteo desde el navbar la vista de 4 dias o 2 semanas
      this.seletTimeCalendar = param;
      //Creo el array del los dias
      this.calcWidthColumn(this.seletTimeCalendar);
      //this.getDate(this.timeCalendar[this.seletTimeCalendar]);
      this.getDataWithParameters()
    }));

    this.eventEmitterUnsuscribe.push(this.dataobsservice.validacionTelefonica.subscribe(() => {
      //Cambio en la validacion telefonica
      //this.getDate(this.timeCalendar[this.seletTimeCalendar]);
      this.getDataWithParameters()
    }));

    this.eventEmitterUnsuscribe.push(this.dataobsservice.checkMyGroups.subscribe(checked => {
        this.only_my_groups = checked ? "1" : "0";
        console.log('3');
        this.getDataWithParameters()
    }));

    // eliminacion de turno, recargar la grilla
    this.eventEmitterUnsuscribe.push(this.dataobsservice.refreshGrid.subscribe(() => {
      this.getDataWithParameters();
    }));

    this.permissionsService.exceptions(['invitado', 'guardia', 'admin-guardia']).then(allowed => this.allowedRole = allowed);
  }

  //Calcular tamaño columnas para 4 dias y objeto para armar las plantillas
  calcWidthColumn(seletTimeCalendar) {
    if(seletTimeCalendar === this.selecType.DAYS) {
      this.columnBtnLicence = this.widthScreen/8;
      this.columnsDays = (this.widthScreen - this.columnBtnLicence)/4;
      this.daysDivider.day = this.columnsDays
      this.daysDivider.offset = this.widthScreen + 50 - this.columnsDays * 4
    } else {
      this.columnBtnLicence = this.widthScreen/10;
      this.columnsDays = (this.widthScreen - this.columnBtnLicence)/14;
    }
  }

  setParamsGroupList() {
    this.sizeParams = {
      widthScreen: this.widthScreen,
      columnBtnLicence: this.columnBtnLicence,
      columnsDays: this.columnsDays,
      dates: this.dates,
    }
  }

  //Obtiene los dias del navbar de calendario
  getDate(param) {
    this.showSkeleton = true;
    this.dates = [];
    param.days = [];
    if(this.obsPlaningCalendar) {
      this.obsPlaningCalendar.unsubscribe();
    }
    for (let index = 0; index < param.value; index++) {
      let nextDay = new Date(this.dateSelected);
      nextDay.setDate(nextDay.getDate() + index);
      this.dates.push({nextDay, hover: false});
      param.days.push(moment(nextDay).format('YYYY-MM-DD HH:mm:ss'));
    }
    this.getCalendarServer(this.dates);
    let finded = this.dates.find(date => date.nextDay.getDate() === this.today.getDate());
    if(finded) {
      finded.selected = true;
    }
    this.setParamsGroupList();
  }

  //Mover el navbar de calendario
  prevNextDays(move) {
    let moveDay = new Date(this.dateSelected);
    let countMoveDats = this.seletTimeCalendar === this.selecType.DAYS ? 6 : 16;
    if(this.obsPlaningCalendar) {
      this.obsPlaningCalendar.unsubscribe();
    }
    /*
      Al ser 6 dias pero se visualzan 4 o 12
      para volver resto los 6 dias pero lo sumo 3
      y para avanzar sumo los 6 dias y resto 1    
    */
    if(move === 'prev') {
      moveDay.setDate(moveDay.getDate() - countMoveDats + 3);
      this.dataobsservice.date.emit(moveDay);
    } else {
      moveDay.setDate(moveDay.getDate() + countMoveDats - 1);
      this.dataobsservice.date.emit(moveDay);
    }
  }

  getCalendarServer(dates) {
    this.obsPlaningCalendar = this.turnosService.getPlanningCalendar(dates,this.only_my_groups, this.idGrupoParam).subscribe(res => {
      this.showSkeleton = false;
      this.setGroupList(res['message'])
      .then(() => this.openGroupsRegistered());
    }, e => this.generalService.errorConnection());
  }

  //Armo la lista de grupos y paso esa lista a otra funcion para crear las licencias
  setGroupList(dataServer) {
    return new Promise(resolve => {
      this.groupList = [];
      const userProfile = JSON.parse(SessionManagerService.getItem('userClaro'));
      
      dataServer.map((data) => {
        let isOpen = data['id_grupo'] == this.idGrupoParam ? true : false;
  
        if(isOpen) {
          this.gridNavigation.registerOpenedGroups(true,data['id_grupo'])
        }
  
        if(userProfile.role === 'guardia') {
          data.group_users.forEach(users => {
            if(users.id_usuario === userProfile.id_usuario) {
              this.guardLoged = users;
              this.groupList.push({data, isOpen});
            } 
          });
        } else {
          this.guardLoged = null;
          this.groupList.push({data, isOpen});
        }
      });

      resolve()
    })
  }

  openGroup(group,fromStorage = false) {
    if (fromStorage && group) {
      group.isOpen = true;
    }
    else if(!fromStorage && group){
      group.isOpen = !group.isOpen;
      this.gridNavigation.registerOpenedGroups(group.isOpen,group.data.id_grupo)
    }
  }

  openGroupsRegistered(){
    let gridNavigation = this.gridNavigation.getFromStorage()
    setTimeout( () => {
      gridNavigation.opened_groups.forEach(groupId => {
        let group = this.groupList.find( g => (g.data.id_grupo == groupId) )
        this.openGroup(group,true)
      })
    },100)
  }
  
  ngOnDestroy(): void {
    this.eventEmitterUnsuscribe.forEach(data => data.unsubscribe());
  }

}
