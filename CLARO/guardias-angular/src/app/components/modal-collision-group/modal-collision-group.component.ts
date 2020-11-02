import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig} from "@angular/material/dialog";
import { SessionManagerService } from "../../services/session-manager.service"
import { GrupoService } from "../../services/grupo.service";
import { NotificationsService, MessageInterface } from "../../services/notifications/notifications.service";
import * as moment from 'moment';


@Component({
  selector: 'app-modal-collision-group',
  templateUrl: './modal-collision-group.component.html',
  styleUrls: ['./modal-collision-group.component.scss']
})
export class ModalCollisionGroupComponent implements OnInit {

  id_group:string;
  group_name:string;
  enableConfirm:boolean = true;
  loading:boolean = false;
  replaceBy:any = [];
  deletedUsers:any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalCollisionGroupComponent>,
    public dialog: MatDialog,
    private grupoService: GrupoService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.replaceBy    = this.data['users'];
    this.id_group     = this.data['id_group'];
    this.group_name   = this.data['group_name'];
    this.deletedUsers = this.data['deletedUsers'];
    this.setSelectionField();
  }

  setSelectionField(): void {
    this.replaceBy.forEach(replace => {
      const assigns = replace['asignaciones'];
      assigns.forEach(assign => {
        assign['deleted'] = true;
        assign['selected'] = null;
        assigns.forEach(assign => {
          const users = assign.usuarios;
          let validated = [];
          let noValidated = [];
          users.forEach(user => {
            if(user.telefono_validado == 0) {
              noValidated.push(user)
            }
            else {
              validated.push(user)
            }
          });
          assign.usuarios = validated.concat(noValidated)
          console.log(assign.usuarios)
        })
      })
    })
  }

  guardSelected({value}): void {
    const {i,j} = value;
    this.replaceBy[i].asignaciones[j]['deleted'] = false;
  }

  delete({source}): void {
    const {i,j} = source.value;
    this.replaceBy[i].asignaciones[j]['selected'] = null;
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  confirm(): void {
    
   this.loading = true;
   this.enableConfirm = false;
   const messages = this.notificationsParse();

   this.notificationsService.batch(messages).subscribe(
     response => this.saveChanges(),
     error => this.saveChanges()
   );
  
  }
  
  saveChanges(): void {

    const data = {
      date_now: moment(new Date()).format('YYYY-MM-DD HH:mm'), 
      id_user_login: SessionManagerService.user().id_usuario,
      id_group: this.id_group,
      asignations: this.assignationsParse()
   }

   this.grupoService.guardReassignments(data).subscribe(response => {
      this.loading = false;
      this.dialogRef.close(true);
   });

  }

  assignationsParse(): Array<object> {
   
   let result = [];

   this.replaceBy.forEach(replace => {

      const assigns = replace['asignaciones'];

      assigns.forEach(assign => {

         result.push({
            id_plantilla_usuario:assign['id_plantilla_usuario'],
            id_asignacion_user:assign['id_asignacion_user'],
            id_rango_horario:assign['id_rango_horario'],
            id_horario_grupo:assign['id_horario_grupo'],
            id_usuario:assign['deleted'] ? "" : assign['selected']['guard']['id_usuario'],
            fecha_desde:assign['fecha_desde'],
            fecha_hasta:assign['fecha_hasta'],
            id_usuario_anterior:replace['id_usuario']
         })

      })
   })

   return result;
  }

  notificationsParse(): MessageInterface[] {

    let idususol = SessionManagerService.user().id_usuario
    let messages = {};
    let group = this.group_name.toUpperCase();
    let date = moment(new Date).format('DD/MM/YYYY HH:mm')
    
    this.deletedUsers.forEach(user => {
      const {id_user_group, apellido, nombre} = user;
      messages[id_user_group] = {
        idususol:idususol,
        idusurecep:id_user_group,
        mensaje:`Se eliminaron tus guardias del grupo ${group}`
      }
    })
  
    this.replaceBy.forEach(replace => {
      const assigns = replace['asignaciones'];
      assigns.forEach(assign => {
        if(assign['deleted'] === false) {
          const {id_usuario, apellido, nombre} = assign['selected']['guard'];
          messages[id_usuario] = {
            idususol:idususol,
            idusurecep:id_usuario,
            mensaje:`Se le asignaron guardias en el grupo ${group}`
          }
        }
      })
    })

    return Object.values(messages);
  }

}
