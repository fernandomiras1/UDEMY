import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig} from "@angular/material/dialog";
import { TurnosLicenciasService } from '../../services/turnos-licencias.service';
import * as moment from 'moment';
import GridNavigation from "../../pages/turnos-licencias/grid-navigation";
import { SessionManagerService } from '@app/services/session-manager.service';
import { NotificationsService } from "../../services/notifications/notifications.service";
import { DataObsService } from '@app/services/data-obs.service';
import { getUserByIdFromCollisions, IDguardsReplaced } from '@app/utils/collision.notifications';
import { titlecase } from '@app/utils/titlecase.string';

@Component({
  selector: 'app-modal-collision-turn',
  templateUrl: './modal-collision-turn.component.html',
  styleUrls: ['./modal-collision-turn.component.scss']
})
export class ModalCollisionTurnComponent implements OnInit {
  item:any;
  description: string;
  disableConfirm:Boolean = false;
  collision; 
  info = {
    grupo:null,
    seleccionado:null,
    desde:null,
    hasta:null
  }

  selectedGroup:string = 'collision_user';
  private gridNavigation: GridNavigation
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalCollisionTurnComponent>,
    public dialog: MatDialog,
    private turnosLicenciasService: TurnosLicenciasService,
    private notificationsService: NotificationsService,
    private dataobsservice: DataObsService
  ) 
  { 
    this.gridNavigation = new GridNavigation;

    const { collision, item } = data;
    this.item = item;
    this.collision = collision;
    this.setCheckedByDefault();
  }

  setCheckedByDefault(): void {
    for( let colissionByMonth of this.collision.collisions ) {
      for(let colission of colissionByMonth.values) {
        colission.collision_user['checked'] = true;
        colission.previous_user['checked'] = false;

        if(colission.previous_user.id_plantilla_usuario == this.item.turno.id_plantilla_usuario) {
          colission['hide'] = true;
        }
        else{
          colission['hide'] = false;
        }
      }
    }
  }

  get totalOfCollisions(): number {

    let total = 0;

    for( let colissionByMonth of this.collision.collisions ) {
      for(let colission of colissionByMonth.values) {
        if(colission['hide'] == false){
          total++;
        }
      }
    }

    return total;
  }

  ngOnInit(): void {
    this.dialogRef.updatePosition({ top: `20px` });
    this.modalInformation();
  }

  modalInformation() {
    this.info.grupo = this.collision.nombre_grupo;
    this.info.desde = this.item.turno.horario_desde;
    this.info.hasta = this.item.turno.horario_hasta;
    this.description = `${this.info.desde} a ${this.info.hasta}`;
  }

  markAll(event): void {
    let activeAll = {
      collision_user:false,
      previous_user:false
    }
    
    activeAll[event.value] = true;

    for( let colissionByMonth of this.collision.collisions ) {
      for(let colission of colissionByMonth.values) {
        colission.collision_user['checked'] = activeAll.collision_user;
        colission.previous_user['checked']  = activeAll.previous_user;
      }
    }
  }

  markRadio(event){
    let active = {
      collision_user:false,
      previous_user:false
    }
    active[event.value.type] = true;
    this.collision.collisions[event.value.i].values[event.value.j]['collision_user']['checked'] = active.collision_user
    this.collision.collisions[event.value.i].values[event.value.j]['previous_user']['checked'] = active.previous_user
    this.markAllRadiosWithSameRange(event);
    this.verifyRadioSelected();
  }

  markAllRadiosWithSameRange(event): void {

    const {fecha_desde, fecha_hasta, checked} = this.collision.collisions[event.value.i].values[event.value.j]['collision_user'];

    for( let colissionByMonth of this.collision.collisions ) {
      for(let colission of colissionByMonth.values) {
        const fecha_desde_col = colission.collision_user.fecha_desde 
        const fecha_hasta_col = colission.collision_user.fecha_hasta 
        if(fecha_desde == fecha_desde_col && fecha_hasta == fecha_hasta_col ){
          colission.collision_user.checked = checked;
          colission.previous_user.checked = !checked;
        }
      }
    }
  }

  verifyRadioSelected(): void {

    let allCollisionUserChecked:boolean = this.isAllChecked('collision_user');
    let allPreviusUserChecked:boolean   = this.isAllChecked('previous_user');
  
    if(allCollisionUserChecked)
      this.selectedGroup = 'collision_user';
    else if(allPreviusUserChecked)
      this.selectedGroup = 'previous_user';
    else
      this.selectedGroup = null
  }

  private isAllChecked(type:string): boolean {
    let checkedValues:boolean[] = [];
    for( let colissionByMonth of this.collision.collisions ) {
      for(let colission of colissionByMonth.values) {
        checkedValues.push(colission[type]['checked']);
      }
    }
    return checkedValues.reduce((a,b) => a && b);
  } 

  confirm(){

      const responseRequestData = {
        id_user_asignado: this.item.guard.id_usuario,
        id_user: SessionManagerService.user().id_usuario,
        id_plantilla_tipo_guardia:this.item.turno.id_tipoguardia,
        id_horario_grupo:this.item.turno.id_horario_grupo,
        fecha_inicio:moment(this.item.turno.dia).format("YYYY-MM-DD HH:mm:ss"),
        fecha_repeticion_hasta:moment(this.item.selectDayCalendar).format("YYYY-MM-DD HH:mm:ss"),
        id_rango_horario:this.item.turno.id_rango_horario,
        id_dropdown_repeticion:this.item.id_dropdown_repeticion,
        id_grupo:this.item.turno.id_grupo,
        descripcion:this.item.descripcion,
        dias_repeticion:this.item.dias_repeticion.join(','),
        dia_todos_los_meses:this.item.dia_todos_los_meses,
        personalizado_cada:this.item.personalizado_cada,
        solucion_colisiones:this.mapCollisions()
      }
      
      this.disableConfirm = true;
      this.turnosLicenciasService.confirmCollisions(responseRequestData)
      .subscribe(() => {
        this.prepareNotifications(this.item.guard,this.collision,this.selectedGroup,responseRequestData.solucion_colisiones)
        this.dialogRef.close();
        this.dataobsservice.refreshGrid.emit();
      });
    
  }

  prepareNotifications(currentUser,collisions,selection,solutions){
      this.sendNotificacionAssignedToNewGuard(currentUser,selection);
      this.sendNotificationToReplacedUsers(currentUser.id_usuario,selection,solutions,collisions);
  }

  sendNotificacionAssignedToNewGuard(currentUser,selection) {
    if(selection != 'previous_user') {
      const {id_usuario, nombre, nombre_usuario, apellido, apellido_usuario} = currentUser;
      const nameUser = nombre ? nombre : nombre_usuario;
      const lastNameUser = apellido ? apellido : apellido_usuario;
      this.notification(id_usuario, nameUser, lastNameUser, 'create');
    }
  }

  sendNotificationToReplacedUsers(currentUserID, selection, solutions, collisions) {
    const IDreplaced = IDguardsReplaced(currentUserID,selection,solutions);
    IDreplaced.forEach(id => {
      const {id_user, nombre, apellido} = getUserByIdFromCollisions(id,collisions.collisions);
      this.notification(id_user, nombre, apellido, 'delete');
    })
  }

  notification(id_usuario, nombre_usuario, apellido_usuario, action) {

    const date = moment().format('DD/MM/YYYY HH:mm');

    const fullName = titlecase(`${apellido_usuario}, ${nombre_usuario}`);

    const message = {
      create:'se le asignaron guardias el dia ' + date,
      update:'se modificaron guardias el dia ' + date,
      delete:'se eliminaron guardias el dia ' + date
    }

    this.notificationsService.send({
      idususol:SessionManagerService.user().id_usuario,
      idusurecep:id_usuario,
      mensaje:`${fullName} ${message[action]}`
    })
    .subscribe(response => console.log(response))
  }

  mapCollisions(){

    let solutions = [];

    for( let colissionByMonth of this.collision.collisions ) {
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

  closeModal() {
    this.dialogRef.close();
  }
}
