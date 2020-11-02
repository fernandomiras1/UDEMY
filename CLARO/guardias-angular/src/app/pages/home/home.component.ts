import { Component, OnInit, ViewChildren } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { TooltipDirective } from 'ng2-tooltip-directive';
import { PermissionsService } from '../../services/permissions.service';
import { optGroupService, optSitioTecPersonalService } from '@app/interfaces/home';
import { GeneralService } from '../../services/general.service';
import { GrupoService } from '../../services/grupo.service';
import { SessionManagerService } from '../../services/session-manager.service';
import { Router } from "@angular/router";
import { Data } from "../../providers/data/data";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDeleteGroupComponent } from "../../components/modal-delete-group/modal-delete-group.component";
import { ModalLeaveGroupComponent } from "../../components/modal-leave-group/modal-leave-group.component";
import { ProfileService } from '../../services/profile.service';
import { NotificationsService } from "../../services/notifications/notifications.service";
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChildren(TooltipDirective) tooltipDirective;
  tooltip: TooltipDirective;
  allowedRole: Boolean;

  optionsNoc = [
    {
      title: 'Personal',
      selected: false,
      inputSearchPlaceholder: 'Buscar recursos',
      checkTitle: '',
      type_view: 'PERSONAL',
      classGrid: 'grid-personal ml-mr-5 mt-2 headerUnderline',
      headertitles: ['Nombre', 'Grupos de Guardia', 'Estado', 'Contacto', 'Info']
    },
    {
      title: 'Sitios | Tecnologías',
      selected: false,
      inputSearchPlaceholder: 'Buscar sitios o tecnologías',
      checkTitle: 'Ver sólo cubiertos',
      btnSelected: 'sitio',
      type_view: 'SITE-TECHNOLOGY',
      classGrid: 'grid-sitios-tec ml-mr-5 mt-2 headerUnderline',
      headertitles: ['En Guardia', 'Fin de Guardia', 'Grupo', 'Contacto', 'Info', 'Grilla']
    },
    {
      title: 'Grupos',
      selected: true,
      inputSearchPlaceholder: 'Buscar grupos',
      checkTitle: 'Ver sólo mis grupos',
      type_view: 'GRUPOS',
      classGrid: 'grid-grupos ml-mr-5 mt-2 headerUnderline',
      headertitles: ['Grupo', 'En Guardia', 'Fin de Guardia', 'Contacto', 'Info', 'Grilla', 'Acciones'],
      exactSearch: false
    },
  ];

  currentTab: string = 'Grupos';

  headerSelected = {classGrid: '', headertitles: [], size: null};
  inputSearchOptions = {
    placeholder: 'Buscar grupos',
    value: '',
    active: false
  };

  checkboxOptions = {
    title: 'Ver sólo mis grupos',
    checked: true,
    type_view: 'GRUPOS',
    technology_site_order: 'sitio',
    userCanSeeCheckbox:false
  };

  userCanSeeActions:Boolean = true;
  userCanSeenCalendar:Boolean = false;
  userCanJoinToGroup:Boolean = false;
  userPhoneValidated:Boolean = true;
  userID: string = SessionManagerService.user().id_usuario;

  dataTableNoc = [];
  obsNoc;
  showSkeleton = true;
  orderByNoc = [
    {
      value: 'ASC',
      icon: 'arrow_drop_up'
    },
    {
      value:'DESC',
      icon: 'arrow_drop_down'
    },
    {
      value:'ASC',
      icon: 'arrow_drop_up'
    }
  ];
  showTooltip: boolean = false;
  myOptions = {
    contentType: "template",
    placement: "bottom",
    hideDelayAfterClick: 3000000,
    pointerEvents: "auto",
  }
 
  currentPage:number = 1;
  limit:number = 25;
  skeletonSize:number[] = [];

  showSpinnerNewPage: boolean;
  endScroll:boolean = false;
  grupo: optGroupService;
  sitiosTecnologia: optSitioTecPersonalService;
  personal: optSitioTecPersonalService;
  viewNoc = {
    grupos: {
      selected: true,
      options: this.grupo,
    },
    sitiosTecnologia: {
      selected: false,
      options: this.sitiosTecnologia,
    },
    personal: {
      selected: false,
      options: this.personal,
    }
  }

  constructor(
    private homeservice: HomeService,
    private permissionsService: PermissionsService,
    private generalService: GeneralService,
    private router: Router,
    private data: Data,
    public matDialog: MatDialog,
    private grupoService: GrupoService,
    private profileService: ProfileService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getServerNoc('GRUPOS',this.getSearchParams('GRUPOS'));
    this.headerSelected.classGrid = this.optionsNoc[2].classGrid;
    this.headerSelected.headertitles = this.optionsNoc[2].headertitles;
    this.permissionsService.exceptions(['guardia', 'admin-guardia', 'invitado']).then(allowed => this.allowedRole = allowed);
    this.permissionsService.has(['invitado']).then(isInvitado => this.checkboxOptions.userCanSeeCheckbox = !isInvitado);
    this.permissionsService.has(['invitado']).then(isInvitado => this.userCanSeenCalendar = isInvitado);
    this.permissionsService.has(['invitado']).then(isInvitado => {
      if(isInvitado){
        this.optionsNoc[2].headertitles.pop()
        this.checkboxOptions.checked = false;
      }
      else{
        this.isPhoneNoValidated()
      }
    });
    this.permissionsService.has(['invitado','guardia']).then(action => this.userCanSeeActions = !action);
    this.permissionsService.has(['guardia']).then(join => this.userCanJoinToGroup = join);
    this.skeletonSize = Array(this.limit).fill(0).map((x,i)=>i);
    
  }
  
  cancelRequest(): void {
    if(this.obsNoc) {
      this.obsNoc.unsubscribe();
    }
  }

  routerNewGroup() {
    this.router.navigate(['/nuevo-grupo']);
  }

  getServerNoc(type_view: string, params: any) {
    this.cancelRequest()
    let service;

    switch (type_view) {
      case 'GRUPOS': 
        service = this.getGroupsFromService(params);
      break;
      case 'SITE-TECHNOLOGY':
      case 'PERSONAL':
        service = this.getSitesTechnologiesPersonalFromService(params)
      break;
    }

    this.obsNoc = service.subscribe(response => {
      if(response) {
        this.dataTableNoc = this.dataTableNoc.concat(response['message']['data']);
        if ('PERSONAL' === type_view) {
          this.personalGrupoGuardiasListing();
        }
        this.showSkeleton = false;
        this.showSpinnerNewPage = false;
        if(response['message']['to'] == null) { 
          this.endScroll = true;
        }
      }
    }, e => this.generalService.errorConnection());
  }

  activeTab(TabOptionSelected) {
    this.cleanInputSearch();
    this.currentPage  = 1;
    this.showSkeleton = true;
    this.endScroll    = false;
    this.dataTableNoc = [];
    this.optionsNoc.forEach(o => o.selected = false)
    TabOptionSelected.selected = true;
    this.currentTab = TabOptionSelected.title;
    this.inputSearchOptions.placeholder = TabOptionSelected.inputSearchPlaceholder;
    this.checkboxOptions.title = TabOptionSelected.checkTitle;
    this.checkboxOptions.checked = this.checkboxOptions.checked
    this.checkboxOptions.type_view = TabOptionSelected.type_view;
    this.optionsNoc[2].btnSelected = 'sitio';
    const type_view = TabOptionSelected.type_view;
    this.getServerNoc(type_view,this.getSearchParams(type_view))
    this.headerSelected.classGrid = TabOptionSelected.classGrid;
    this.headerSelected.headertitles = TabOptionSelected.headertitles;
    this.optionsNoc[2]['exactSearch'] = false;
  }

  getGroupsFromService({group_order = 'ASC', limit = 10, page = 1, string_search = '', only_my_groups = true, string_exact_group_name = false}) {
    return this.homeservice.getGroup(
      group_order,
      limit,
      page,
      string_search,
      only_my_groups,
      string_exact_group_name
    )
  }

  getSitesTechnologiesPersonalFromService({order = 'ASC', limit = 10, type_view, page = 1, string_search = '', lastname_search = '', only_with_assignments = true, technology_site_order = ''}) {
    return this.homeservice.getNoc(
      order, 
      limit,
      type_view, 
      page, 
      string_search,
      lastname_search, 
      only_with_assignments, 
      technology_site_order
    )
  }

  toggleSitiosTec(option) {
    const type_view   = 'SITE-TECHNOLOGY';
    this.showSkeleton = true;
    this.endScroll    = false;
    this.currentPage  = 1;
    this.dataTableNoc = [];
    this.optionsNoc[1].btnSelected = option;
    this.checkboxOptions.technology_site_order = option;
    this.getServerNoc(type_view,this.getSearchParams(type_view))
  }

  checkboxListener() {
    this.dataTableNoc = [];
    this.showSkeleton = true;
    this.endScroll  = false;
    this.currentPage = 1;
    const type_view = this.checkboxOptions.type_view
    this.getServerNoc(type_view,this.getSearchParams(type_view))
  }
  
  groupSitiosTecOrder() {
    const orderToggle = {
      ASC:{order:'DESC',icon:'arrow_drop_down'},
      DESC:{order:'ASC',icon:'arrow_drop_up'}
    }
    const oppositeOrder = orderToggle[ this.orderByNoc[0].value ];
    this.showSkeleton = true;
    this.orderByNoc[0].value = oppositeOrder.order;
    this.orderByNoc[0].icon = oppositeOrder.icon;
    this.dataTableNoc = [];
    const type_view = 'SITE-TECHNOLOGY';
    this.getServerNoc(type_view,this.getSearchParams(type_view))
  }

  search() {
    this.cancelRequest();
    const type_view = this.checkboxOptions.type_view
    const groupIndex = 2;
    this.dataTableNoc = [];
    this.showSkeleton = true;
    this.endScroll  = false;
    this.currentPage = 1;
    this.optionsNoc[groupIndex]['exactSearch'] = false;
    this.getServerNoc(type_view,this.getSearchParams(type_view))
  }

  cleanInputSearch() {
    const groupIndex = 2;
    if(!this.optionsNoc[groupIndex]['exactSearch']) {
      this.inputSearchOptions.value = '';
    }
  }

  getSearchParams(type_view: string){
    const params:any = {
      "GRUPOS" : {
        group_order: 'ASC' ,
        limit: this.limit,
        page: this.currentPage,
        string_search: this.inputSearchOptions.value,
        only_my_groups: this.checkboxOptions.checked,
        string_exact_group_name: this.optionsNoc[2]['exactSearch']
      },
      
      "SITE-TECHNOLOGY": {
        order: this.orderByNoc[0].value, 
        group_order:this.orderByNoc[0].value, 
        limit: this.limit,
        type_view: 'SITE-TECHNOLOGY', 
        page: this.currentPage,
        string_search: this.inputSearchOptions.value,
        only_with_assignments: this.checkboxOptions.checked,
        technology_site_order: this.optionsNoc[1].btnSelected,
      },

      "PERSONAL": {
        order: 'ASC', 
        limit: this.limit,
        type_view: 'PERSONAL', 
        page: this.currentPage,
        lastname_search: this.inputSearchOptions.value,
      }
    }

    return params[type_view];
  }
  
  exactSearch(groupName:string) {
    this.obsNoc.unsubscribe();
    const groupIndex = 2;
    this.optionsNoc[groupIndex]['exactSearch'] = true;
    this.checkboxOptions.checked = false;
    this.inputSearchOptions.value = groupName;
    this.activeTab(this.optionsNoc[groupIndex])
  }

  infoTooltipHide(positionTooltip) {
    this.tooltip = this.tooltipDirective.find(elem => elem.id == `tooltipId${positionTooltip}`);
    this.tooltip.hide();
  }

  closeAllTooltip() {
    this.tooltipDirective.forEach(tooltip => {
      tooltip.hide();
    });;
  }

  goCalendarPage(group_id:string) {
    this.router.navigate(['/calendario/grupos'], { queryParams: { id_grupo: group_id }} );
  }

  getLinkByTeams(users:any[]) {
    return `https://teams.microsoft.com/l/chat/0/0?users=${users.map(user => user.email)}`;
  }

  openMailOrSkype(users:any[], option: string): void {
    let link = '';
    switch(option.toLowerCase()) {
      case 'skype':
        link = 'im:' + users.map(user => `<sip:${user.email}>`).join('');
      break;
      case 'email':
        link = 'mailto:' + users.map(user => `${user.email};`).join('');
      break;
    }
    
    window.location.href = link;
  }

  detallePerfil(id_usuario:string) {
    this.router.navigate(["/perfil",id_usuario]);
  }
  
  deleteGroupModalConfirm({id_grupo,nombre_grupo,count_people,count_site_tecno,tipo_grupo}){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.panelClass = "container-custom-modal";
    dialogConfig.width = "360px";
    dialogConfig.data = {id:id_grupo,group:nombre_grupo, type:tipo_grupo, people:count_people, quantity:count_site_tecno};
    this.matDialog.open(ModalDeleteGroupComponent, dialogConfig);
  }

  joinGroup(group,status:number): void {
    const data = {
      id_grupo:group.id_grupo,
      id_usuario: SessionManagerService.user().id_usuario,
      estado:status,
      usuario_creador: SessionManagerService.user().id_usuario,
      date_now: moment(new Date()).format('YYYY-MM-DD HH:mm')
    }
     
    if(status) {
      this.grupoService.joinGroup(data).subscribe(r => {
        this.changeLoggerUserPresent(group);
      });
    }
    else {
       this.confirmLeaveGroup(group,data);
    }
  }

  confirmLeaveGroup(group,data): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = "container-custom-modal";
    dialogConfig.width = "360px";
    dialogConfig.data = {
      group: group.nombre_grupo,
      quantity: group.count_site_tecno,
      type: group.id_tipo_grupo = 1 ? 'Sitios' : 'Tecnologías'
    }

    this.matDialog.open(ModalLeaveGroupComponent,dialogConfig)
    .afterClosed()
    .subscribe(confirm => {
      if(confirm) {
        this.grupoService.joinGroup(data).subscribe(r => {
          this.changeLoggerUserPresent(group);
        });
      }
    })
  }

  changeLoggerUserPresent(group): void {
    this.dataTableNoc.forEach(groupItem => {
      if(groupItem.id_grupo == group.id_grupo){
        groupItem.logged_user_present = !Boolean(groupItem.logged_user_present)
      }
    })
  }

  onScrollDown(): void {
    if(!this.showSpinnerNewPage && !this.endScroll) {
      this.closeAllTooltip();
      this.showSpinnerNewPage = true;
      this.currentPage++;
      const type_view = this.checkboxOptions.type_view;      
      this.getServerNoc(type_view, this.getSearchParams(type_view))
    }
  }

  skypeFormat(number:string):string {
    return number.replace('(','').replace(')','');
  }

  isPhoneNoValidated() {
    const user = SessionManagerService.user();
    this.profileService.getById(user.id_usuario).subscribe(response => {
      
      const corporativo = response['user']['celular_corporativo']['validacion'];
      const guardia = response['user']['celular_guardia']['validacion'];
      const canSendNotification = SessionManagerService.getItem('phone-notification') ? false : true;

      if((corporativo == null || guardia == null) && canSendNotification) {
        this.userPhoneValidated = false;
        this.notification(response['user']);
        SessionManagerService.setItem('phone-notification','true'); 
      }

    })
  }

  notification({id_usuario, nombre, apellido}){
    
    const data = {
      idususol: id_usuario, 
      idusurecep: id_usuario,
      mensaje: `${apellido}, ${nombre} se requiere completar la información de perfil para poder ser asignado a una guardia.`
    };
    this.notificationsService.send(data).subscribe(
      response => console.log(response),
      error => console.log('Error:',error)
    );
  }

  personalGrupoGuardiasListing() {
    this.dataTableNoc.forEach(data => {
      if (data.grupos && data.grupos.length) {
        let currentCharGrupoGuardia = 0;
        const maxCharGrupoGuardia = 40;
        const listShowGroups = [];
        const listHiddenGroups = [];
        data.grupos.forEach(grupo => {
          const separatorChars = (currentCharGrupoGuardia) ? 2 : 0;
          currentCharGrupoGuardia += grupo.nombre_grupo.length + separatorChars;
          if (maxCharGrupoGuardia < currentCharGrupoGuardia) {
            listHiddenGroups.push(grupo);
          } else {
            listShowGroups.push(grupo);
          }
        });
        data.listingGruposGuardia = listShowGroups;
        data.listingMoreGruposGuardia = listHiddenGroups;
      }
    });
  }

}
