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
  showLoadingModal;
  turno;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalDeleteTurnComponent>,
              public turnosService: TurnosLicenciasService,
              private dataobsservice: DataObsService,
              private notificationsService: NotificationsService
              ) { 
                const { turno, id_plantilla_usuario } = data;
                this.turno = turno;
                this.dateStartEnd = turno.turno.template_user;
                this.id_plantilla_usuario = id_plantilla_usuario;
              }

  ngOnInit(): void {
    this.dialogRef.updatePosition({ top: `20px` });
  }
  closeModal() {
    this.dialogRef.close();
  }
  deleteTurn() {
    
    let guardRange = this.verifyIfDatesBelongsToSameDay(this.turno.turno)

    let deleteGuard = {
      fecha_repeticion_inicia: guardRange.from,
      fecha_repeticion_hasta:guardRange.to,
    }
    
    this.showLoadingModal = true;
    this.turnosService.deleteTurn(this.id_plantilla_usuario, deleteGuard).subscribe(res => {
      const guard = this.turno.turno.template_user.user;
      this.notification(guard);
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

  notification(guard) {

    const date = moment().format('DD/MM/YYYY HH:mm');

    const {idusuario, nombre, apellido} = guard;
    
    this.notificationsService.send({
      idususol:SessionManagerService.user().id_usuario,
      idusurecep:idusuario,
      mensaje:`${apellido}, ${nombre} se eliminaron guardias el dia ${date}`,
    })
    .subscribe(() => {
      this.showLoadingModal = false;
      this.closeModal();
      this.dataobsservice.refreshGrid.emit();
    });
  }
}
