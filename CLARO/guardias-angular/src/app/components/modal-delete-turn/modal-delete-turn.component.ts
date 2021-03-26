import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { TurnosLicenciasService } from '@app/services/turnos-licencias.service';
import { NotificationsService } from "../../services/notifications/notifications.service";
import { SessionManagerService } from "../../services/session-manager.service";
import * as moment from 'moment'
import { DataObsService } from '@app/services/data-obs.service';

@Component({
  selector: 'app-modal-delete-turn',
  templateUrl: './modal-delete-turn.component.html',
  styleUrls: ['./modal-delete-turn.component.scss']
})
export class ModalDeleteTurnComponent implements OnInit {
  dateStartEnd;
  id_plantilla_usuario;
  id_plantilla_grupo;
  showLoadingModal;
  turno;
  grupal;
  grupalInfo;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalDeleteTurnComponent>,
              public turnosService: TurnosLicenciasService,
              private dataobsservice: DataObsService,
              private notificationsService: NotificationsService
              ) { 
                const { turno, id_plantilla_usuario, id_plantilla_grupo, grupal, grupalInfo} = data;
                this.turno = turno;
                this.dateStartEnd = turno.turno.template_user;
                this.id_plantilla_usuario = id_plantilla_usuario;
                this.id_plantilla_grupo = id_plantilla_grupo;
                this.grupal = grupal;
                this.grupalInfo = grupalInfo;
              }

  ngOnInit(): void {
    this.dialogRef.updatePosition({ top: `20px` });
    console.log(SessionManagerService.user());
  }
  closeModal() {
    this.dialogRef.close();
  }
  deleteTurn() {
    
    let guardRange = this.verifyIfDatesBelongsToSameDay(this.turno.turno)

    const data = {
      id_plantilla_usuario: this.id_plantilla_usuario,
      id_plantilla_grupo: this.id_plantilla_grupo,
      fecha_inicial: guardRange.from,
      fecha_final:guardRange.to,
      grupal:this.grupal
    }
    
    this.showLoadingModal = true;
    this.turnosService.deleteTurn(data).subscribe(() => {
      if(this.grupal)
        this.notificationForGroup();
      else
        this.notificationForGuard();
    });
  }

  verifyIfDatesBelongsToSameDay({horario_desde,horario_hasta,dia}){
    
    let day = moment(dia).format('YYYY-MM-DD')
    let fromDate = moment(day + ' ' + horario_desde)
    let toDate= moment(day + ' ' + horario_hasta)
  
    if(fromDate > toDate) {
      toDate.add(1,'days');
    }
  
    return {
      from: fromDate.format('YYYY-MM-DD HH:mm:ss'),
      to: toDate.format('YYYY-MM-DD HH:mm:ss')
    }
  }

  notificationForGuard() {
    const guard = this.turno.turno.template_user.user;

    const date = moment().format('DD/MM/YYYY HH:mm');

    const {idusuario, nombre, apellido} = guard;
    
    this.notificationsService.send({
      idususol:SessionManagerService.user().id_usuario,
      idusurecep:idusuario,
      mensaje:`${apellido}, ${nombre} se eliminaron guardias el dia ${date}`,
    })
    .subscribe(() => this.reload());
  }

  notificationForGroup()
  {
    const { lista_distribucion } = this.grupalInfo;
    const { id_usuario, nombre, apellido} = SessionManagerService.user()
    const date = moment().format('DD/MM/YYYY HH:mm');
    
    this.notificationsService.send({
      idususol: id_usuario,
      email : lista_distribucion,
      mensaje:`${apellido}, ${nombre} se eliminaron guardias el dia ${date}`,
    })
    .subscribe(
      () => this.reload(),
      () => this.reload()
    );
  }

  reload()
  {
    this.showLoadingModal = false;
    this.dialogRef.close();
    this.dataobsservice.refreshGrid.emit();
  }

}
