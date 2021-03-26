import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataObsService } from '@app/services/data-obs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/services/general.service';
import * as moment from 'moment';
import { PermissionsService } from '../../services/permissions.service';
import GridNavigation from '../../pages/turnos-licencias/grid-navigation';
import { GrupoService } from '../../services/grupo.service';
import { SessionManagerService } from '../../services/session-manager.service';
import { MODE_SELECT_TIME } from '@app/utils/common.enum';
import { SELECT_OPTIONS_GROUP, SELECT_OPTIONS_TIME } from '@app/utils/static.data';
import { USER_PROFILE } from '@app/utils/common.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() action;
  @Input() optionsRoutesPage;
  @Input() detailGroup: boolean;
  @Input() plantillas: boolean;
  @Input() calendar: boolean;
  @Input() headerTitle: string;
  @Input() groupName: string;
  @Input() showMarker = false;
  @Input() groupType: string;
  @Output() cancelPlantillas = new EventEmitter<any>();
  @Output() savePlantillas = new EventEmitter<any>();
  validateSigosActive: number;
  user;
  isOpenMenu: Boolean = false;
  selectDay: Date =  new Date();
  allowedRole: Boolean;
  userCanJoinToGroup: boolean = false;
  userIsJoined: boolean;
  group_id: string;
  optionsSelectGroup = SELECT_OPTIONS_GROUP;
  valueSelectGroup:string;
  userCanSeeSelectGroup: Boolean = false;
  private gridNavigation: GridNavigation;
  profile: typeof USER_PROFILE  = USER_PROFILE;
  
  public valueSelectTime: string;
  public selecType: typeof MODE_SELECT_TIME = MODE_SELECT_TIME;
  public optionsSelectTime = SELECT_OPTIONS_TIME;

  constructor(private dataobsservice: DataObsService,
              public generalService: GeneralService,
              private permissionsService: PermissionsService,
              private router: Router,
              private route: ActivatedRoute,
              private grupoService: GrupoService
              ) {
                this.userData();
              }

  ngOnInit(): void {
    this.setDefaultValueForSelectGroup();
    this.gridNavigation = new GridNavigation();
    this.checkPreviousNavigation()
    this.setDay();
    this.setMenuOptions();
    this.setCheckbox();
    this.valueSelectTime = SessionManagerService.getItem('selecTime') || this.selecType.DAYS;
    this.permissionsService.has(['admin-guardia', 'admin-jefe-guardia', 'jefe-admin', 'admin-jefe']).then(allowed => this.allowedRole = allowed);
    this.permissionsService.has(['jefe-guardia','guardia']).then(isSupervisor => this.enableJoinButtons(isSupervisor));
  }

  setDefaultValueForSelectGroup(){
    const isInvitado = SessionManagerService.user().role == 'invitado';
    this.userCanSeeSelectGroup = !isInvitado;
    this.valueSelectGroup = isInvitado ? SELECT_OPTIONS_GROUP[0].value : SELECT_OPTIONS_GROUP[1].value;
  }

  onChangedValueGroup(value){
    this.valueSelectGroup = value;
    this.dataobsservice.filterGroups.emit(value);
  }

  onChangedValueSelect(value: string ) {
    SessionManagerService.setItem('selecTime', value);
    this.dataobsservice.selectTimeCalendar.emit(value);
  }
  
  setCheckbox(){
    this.route.queryParams.subscribe(params => {
      if( params['id_grupo'] ) {
        this.valueSelectGroup = SELECT_OPTIONS_GROUP[0].value;
      }
    });
  }

  checkPreviousNavigation() {

    let calendarDayStorage = this.gridNavigation.getFromStorage().calendar_day

    if(calendarDayStorage.redirect) {
      let day = moment(calendarDayStorage.day).add(1,'days')
      this.selectDay = new Date(day.toDate())
    }
  }

  setMenuOptions() {
    this.dataobsservice.date.subscribe(date => {
      this.selectDay = date;
    });
    if(this.router.url !== '/login') {
      this.generalService.checkValidacionTelefonica().subscribe(res => {
        this.validateSigosActive = res['message'][0].active;
      });
    }
  }
  userData() {
    const user = this.generalService.getUser();
    if(user) {
      this.user = user;
    }
  }
  menuClosed() {
    this.isOpenMenu = false;
  }
  menuOpened() {
    this.isOpenMenu = true;
  }
  setDay() {
    this.dataobsservice.date.emit(this.selectDay);
  }
 
	logout() {
    this.generalService.clearClaroStorage();
  }

  selectedDay() {
    this.dataobsservice.date.emit(this.selectDay);
  }
  goPage(optionRoutesPage) {
    if(optionRoutesPage == 3) {
		  this.router.navigateByUrl('home');
    } else {
  		this.router.navigateByUrl('calendario/grupos');
    }
  }
  serverValidacionTelefonica(e) {
    e.stopPropagation();
    this.validateSigosActive = this.validateSigosActive == 1 ? 0 : 1;
    this.generalService.validacionTelefonica(this.validateSigosActive).subscribe(res => {
      this.dataobsservice.validacionTelefonica.emit();
    });
  }

  enableJoinButtons(isSupervisor:boolean): void {

    if(this.router.url.indexOf('detalle-grupo') === -1) return null;

    if(this.detailGroup && isSupervisor){
      this.route.paramMap.subscribe(urlParam => {
        console.log(this.router.url)
        this.group_id = urlParam['params']['id'];
        this.grupoService.checkRemedyGroup(this.group_id).subscribe(data => {
          this.userCanJoinToGroup = data['can_join'];
          this.userIsJoined = data['joined'];
        });
      })
    }
  }

  joinToGroup(status:number): void {
    const data = {
      id_grupo:this.group_id,
      id_usuario:SessionManagerService.user().id_usuario,
      estado:status,
      usuario_creador:SessionManagerService.user().id_usuario,
      date_now:moment(new Date()).format('YYYY-MM-DD HH:mm')
    }
    this.userIsJoined = !this.userIsJoined
    this.grupoService.joinGroup(data).subscribe(r => console.log(r))
  }

  reloadPage()
  {
    location.href = "/calendario/grupos";
  }

}
