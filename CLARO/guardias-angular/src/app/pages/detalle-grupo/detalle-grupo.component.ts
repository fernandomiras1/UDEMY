import { Component, OnInit, ViewChild } from '@angular/core';
import { GrupoService } from '../../services/grupo.service';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../services/general.service';
import { PermissionsService } from '../../services/permissions.service';
import {ModalComponent} from 'angular-custom-modal';
import { ModalTurnoComponent as AppModalTurnoComponent } from '@app/components/modal-turno/modal-turno.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalEditPeopleByGroupComponent } from '../../components/modal-edit-people-by-group/modal-edit-people-by-group.component';
import { GroupSites, DeletedUsers, DetailGroupUser, DataGroupSite } from '../../models/group.model';
import { MODE_STATUS_TEMPLATE } from '@app/utils/common.enum';
import { Template } from '@app/models/template.model';
import { ModalDeleteTemplateComponent } from '@app/components/modal-delete-template/modal-delete-template.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-grupo',
  templateUrl: './detalle-grupo.component.html',
  styleUrls: ['./detalle-grupo.component.scss']
})
export class DetalleGrupoComponent implements OnInit {
  @ViewChild('htmlInsideModal') htmlInsideModal: ModalComponent;
  @ViewChild('htmlAlertSaveTemplateModal') htmlAlertSaveTemplateModal: ModalComponent;
  loading:boolean = true;
  nombre_grupo = 'Detalle del grupo';
  isEdit = false;
  templatesSelectionView = false;
  dataGroup: DataGroupSite;
  dataGroupModified;
  tipo_grupo: string;
  errorsValidateNumberRotary: Boolean;
  sitios = [];
  cancelPlantillaHorarios;
  id;
  plantillaHora = '';
  plantillaName = '';
  isSaveDisabled = true;
  isDeletingLastPlantilla = false;
  userCanEditGroup = true;
  templatesSelectedById: number[] = []
  modeTemplate: typeof MODE_STATUS_TEMPLATE = MODE_STATUS_TEMPLATE;
  templateList: any[] = [];
  constructor(private grupoService: GrupoService,
              private route: ActivatedRoute,
              private generalservice: GeneralService,
              private permissionsService: PermissionsService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(urlParam => {
      this.tipo_grupo = urlParam['params']['tipo_grupo'];
      if(this.tipo_grupo == '1') {
        this.tipo_grupo = 'sitio'
      } else if(this.tipo_grupo == '2') {
        this.tipo_grupo = 'tecnologia'
      }
      this.id = urlParam['params']['id'];
      this.getDetailGroup(true);
    });

  }

  getDetailGroup(isInit: boolean) {
    this.grupoService.getDetailGroup(this.id).subscribe(res => {
      this.setDetailGroup(isInit, res);
    });
  }

  setDetailGroup(isInit: boolean, res:any){
      this.loading = false;
      res.cant_usuarios = this.setUsers(res.usuarios).countUser;
      res.todosUsuarios = this.setUsers(res.usuarios).users;
      this.dataGroup = res;
      this.userCanEditGroup = this.dataGroup.is_editable;
      this.nombre_grupo = this.dataGroup.nombre_grupo;
      this.dataGroup.celular_corporativo_requerido = this.stringToBoolean(this.dataGroup.celular_corporativo_requerido);
      this.dataGroup.celular_guardia_requerido = this.stringToBoolean(this.dataGroup.celular_guardia_requerido);
      this.dataGroup.linea_rotativo_requerido = this.stringToBoolean(this.dataGroup.linea_rotativo_requerido);
      this.isSaveDisabled = (
        this.dataGroup.celular_corporativo_requerido ||
        this.dataGroup.celular_guardia_requerido ||
        this.dataGroup.linea_rotativo_requerido
      );
      if (isInit && this.tipo_grupo === 'sitio') {
        this.addSitios(this.dataGroup.sitios);
      }
      this.generalservice.setIninitalStateObj(this.dataGroup);
      this.getTemplatesById();
      this.setTemplateList();
  }

  async editPersonas() {
    const sites = [];
    const users = [];
    this.dataGroup.todosUsuarios.forEach((user: DetailGroupUser) => {
      user.selected = true;
      users.push(user);
    });
    this.dataGroup.sitios.forEach(site => {
      if(site.alcance) {
        sites.push({tecnologia: site.alcance, grupo_remedy: site.alcance, managed_object: null, selected: true})
      } else {
        sites.push({localidad: site.localidad, name: site.acronimo, selected: true});
      }
    });
    const sitesUsers: GroupSites = {
      users,
      sites,
      dataGroup: this.dataGroup
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'container-custom-modal';
    dialogConfig.width = '100%';

    dialogConfig.data = {
      typeGroup: this.tipo_grupo,
      sitesUsers,
    };

    const modalDialog = this.matDialog.open(ModalEditPeopleByGroupComponent, dialogConfig);

    modalDialog.afterClosed().subscribe((deletedUsers: DeletedUsers) => {
      let newUsers = [];

      if(deletedUsers) {
        deletedUsers.users.forEach(userDelete => {
          newUsers = this.dataGroup.todosUsuarios.filter((user: DetailGroupUser) =>  user.idusuario !== userDelete.id_user_group);
        });

        this.dataGroup.todosUsuarios = newUsers;
        this.dataGroup.cant_usuarios = newUsers.length;

      }

    });
  }
  editGroup() {
    this.isEdit = true;
  }
  setUsers(user) {
    const usersBd = user[''];
    const countUser = usersBd.cant_usuarios;
    const users = [];
    for (const key in usersBd.usuarios) {
      users.push(usersBd.usuarios[key]);
    }
    return { countUser, users };
  }

  setTemplateList(){
    this.templateList = this.dataGroup.plantilla_tipo_guardia;
  }

  get templates() {
    return this.templateList;
  }

  getHoursToStringFromBlocks(template:any): string {
    
    const blockSize = template.horario_plantilla.length;
    let str = `${blockSize} bloque${ (blockSize == 1 ? '' : 's') }: `;

    return str + template.horario_plantilla.map((range:any) => {
      return range.horario_desde + ' a ' + range.horario_hasta;
    }).join(' | ');

  }

  addTemplates() {
    this.templatesSelectionView = true;
  }

  getTemplatesById() {
    for (const template of this.dataGroup.plantilla_tipo_guardia) {
      this.templatesSelectedById.push( Number(template.id_tipo_guardia) );
    }
  }

  get templatesByID(){
    return this.templateList.map(template => Number(template.id_tipo_guardia));
  }

  onSelectedTemplates(templates: Template[]) {
    templates.forEach(template => {
      if(!this.alreadyExistsInList(template)) {
        Object.assign(template, {horario_plantilla: template.rango_hour});
        Object.assign(template, {itIsSavedInDatabase: false});
        this.templateList.push(template);
      }
    });
  }

  alreadyExistsInList(template): boolean {
    const exists = this.templateList.find(currentTemplate => Number(currentTemplate.id_tipo_guardia) == Number(template.id_tipo_guardia));
    return exists ? true : false;
  }

  onSavePlantillaHorarios() {
    this.templatesSelectionView = false;
  }

  onCancelPlantillaHorarios() {
    this.templatesSelectionView = false;
    this.dataGroup = this.generalservice.getIninitalStateObj();
    this.isDeletingLastPlantilla = false;
  }

  cancelEditGroup() {
    this.isEdit = false;
    this.dataGroup = this.generalservice.getIninitalStateObj();
    this.isDeletingLastPlantilla = false;
  }

  stringToBoolean(value): boolean {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true' || value === '1' ? true : false;
    } else {
      return value ? true : false;
    }
  }

  printTurnos(plantilla) {
    const horarioPlantilla = plantilla.horario_plantilla || plantilla.plantillasHorarios;
    let count = 0;
    let separator = '';
    let printHorarios = '';
    horarioPlantilla.forEach( hrplantilla => {
      const { horario_desde, horario_hasta } = hrplantilla;
      separator = (count < horarioPlantilla.length - 1) ? ' | ' : '';
      printHorarios += horario_desde + ' a ' + horario_hasta + separator;
      count++;
    });
    return printHorarios;
  }

  guardarCambios() {
    const data = {
      dataGroup: this.dataGroup,
      plantillaChanges: this.filterTemplatesWithChanges()
    };
    const isValid = this.dataGroup.linea_rotativo_requerido ? this.validateNumberRotary() : true;

    if (isValid) {
      this.isEdit = false;
      this.loading = true;
      this.grupoService.saveDetailGroup(this.id, data)
      .subscribe(res => {
        this.setDetailGroup(false, res);
      });
    }
  }

  filterTemplatesWithChanges(): any[] {
    return this.templateList
    .filter(template => {
      return !(template.itIsSavedInDatabase && template.estado == 1) 
    })
    .map(template => {
      return {
        id_plantilla_horario: String(template.id_tipo_guardia),
        estado: String(template.estado)
      }
    })
  }

  validateNumberRotary() {
		const validate = /^[\*\#][\d]{4,5}\b$|^[\d]{8,13}\b$/.test(this.dataGroup.linea_rotativo);
		if (validate) {
			this.errorsValidateNumberRotary = false;
			return true;
		} else {
			this.errorsValidateNumberRotary = true;
			return false;
		}
  }

  addSitios(sitios: any []) {
    const localidades = [...new Set(sitios.map(sitio => sitio.localidad))];
    localidades.forEach(localidad => {
      const acronimos = [];
      sitios.forEach(sitio => {
        if (sitio.localidad === localidad) {
          acronimos.push(sitio.acronimo);
        }
      });
      this.sitios.push({acronimos, localidad});
    });
  }

  deleteTemplate(templateIndex: number, template: any): void {
    
    if( this.ifMinimumLengthOfTemplates ) {
      return;
    }

    if( template.estado == 1 && template.itIsSavedInDatabase ) {
      this.ConfirmDeleteTemplateSavedInDatabase(template)
      .subscribe((estado:number) => template.estado = estado);
    }
    else if(!template.itIsSavedInDatabase){
      this.templateList.splice(templateIndex, 1);
    }
  }

  get ifMinimumLengthOfTemplates(): boolean {
    return this.templateList.filter(template => template.estado == 1).length == 1;
  }

  ConfirmDeleteTemplateSavedInDatabase(template): Observable<number> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.panelClass = 'container-custom-modal';
    dialogConfig.width = '500px';
    dialogConfig.data = {
      name: template.nombre_tipo_de_guardia,
      range: this.getHoursToStringFromBlocks(template)
    }
    const modalDialog = this.matDialog.open(ModalDeleteTemplateComponent, dialogConfig);
    return modalDialog.afterClosed();
  }

  listGuardiasDeTurno(guardiasTurnos) {
    let listGuardiasTurno = '';
    guardiasTurnos.forEach( (gturno, idx) => {
      const { apellido, nombre } = gturno;
      const comma = ( apellido && nombre ) ? ', ' : '';
      const separator = (idx < guardiasTurnos.length - 1 ) ? ' | ' : '';
      listGuardiasTurno += apellido + comma + nombre + separator;
    });
    return listGuardiasTurno;
  }

  get isLoading() {
    return this.loading;
  }
}
