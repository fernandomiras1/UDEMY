import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataObsService } from '@app/services/data-obs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/services/general.service';
import * as moment from 'moment';
import { PermissionsService } from '../../services/permissions.service';
import GridNavigation from '../../pages/turnos-licencias/grid-navigation';
import { GrupoService } from '../../services/grupo.service';
import { SessionManagerService } from '../../services/session-manager.service';

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
  @Input() nombreGroup: string;
  @Output() cancelPlantillas = new EventEmitter<any>();
  @Output() savePlantillas = new EventEmitter<any>();
  validateSigosActive: number;
  user;
  isOpenMenu: Boolean = false;
  selectDay: Date =  new Date();
  allowedRole: Boolean;
  userCanSeeCheckbox: Boolean = false;
  userCanJoinToGroup: boolean = false;
  userIsJoined: boolean;
  group_id: string;
  onlyMyGroups:boolean = true;

  private gridNavigation: GridNavigation;

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

    this.gridNavigation = new GridNavigation();
    this.checkPreviousNavigation()
    this.setDay();
    this.setMenuOptions();
    this.setCheckbox();
    this.permissionsService.has(['admin-guardia', 'admin-jefe-guardia', 'jefe-admin', 'admin-jefe']).then(allowed => this.allowedRole = allowed);
    this.permissionsService.has(['invitado']).then(isInvitado => this.userCanSeeCheckbox = !isInvitado);
    this.permissionsService.has(['jefe-guardia','guardia']).then(isSupervisor => this.enableJoinButtons(isSupervisor))
  }
  
  setCheckbox(){
    this.route.queryParams.subscribe(params => {
      if( params['id_grupo'] ) {
        this.onlyMyGroups = false;
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
  toggleMyGroups(value: boolean) {
    this.dataobsservice.checkMyGroups.emit(value);
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
    if(this.detailGroup && isSupervisor){
      this.route.paramMap.subscribe(urlParam => {
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

}
