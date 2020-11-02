import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig} from "@angular/material/dialog";
import { ModalDeleteTurnComponent } from '../modal-delete-turn/modal-delete-turn.component';
import { ModalDeleteRepetitionsComponent } from "../modal-delete-repetitions/modal-delete-repetitions.component";
import { TurnosLicenciasService } from '@app/services/turnos-licencias.service';
import { SessionManagerService } from '@app/services/session-manager.service';
import { NotificationsService } from '@app/services/notifications/notifications.service';
import { ModalTurnoComponent } from '../modal-turno/modal-turno.component';
import * as moment from 'moment';
import { PermissionsService } from '@app/services/permissions.service';
import { transformStringInDates } from "@app/utils/dates.operations";
import { Subscription } from 'rxjs';
import { DataObsService } from '@app/services/data-obs.service';

@Component({
  selector: 'app-modal-show-turn',
  templateUrl: './modal-show-turn.component.html',
  styleUrls: ['./modal-show-turn.component.scss']
})
export class ModalShowTurnComponent implements OnInit, OnDestroy {
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
  user;
  nameTurn;
  turno;
  repeatTxt;
  dateRepeat;
  rulesRepeat;
  rulesRepeatDescription;
  id_repeticion;
  daysRepeat;
  dataTurn;
  userRol;
  subtitle: string;
  isEditable:boolean = false;
  partialEdition:boolean = false;
  eventEmitterUnsuscribe: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalShowTurnComponent>,
              public dialog: MatDialog,
              public turnosService: TurnosLicenciasService,
              public notificationsService: NotificationsService,
              private permissionsService: PermissionsService,
              private dataobsservice: DataObsService,

              ) {
              
                enum REPETITIONS {
                  NUNCA = "1",
                  TODOS_LOS_DIAS = "2",
                  TODAS_LAS_SEMANAS = "3",
                  TODOS_LOS_MESES = "4",
                  PERSONALIZADO = "5"
                }

                this.dataTurn = data;
                const { turno } = data
                this.user = turno.textoLargo;
                this.nameTurn = turno.type_guardia.nombre_tipo_de_guardia;
                this.turno = turno;
                this.repeatTxt = turno.template_user.rules_repetition.repetition.nombre_repeticion;
                this.dateRepeat = turno.template_user.fecha_repeticion_hasta;
                this.id_repeticion = turno.template_user.rules_repetition.id_repeticion;
                if(this.id_repeticion == REPETITIONS.TODOS_LOS_MESES) {
                  if(turno.template_user.rules_repetition.descripcion.split(" ").length > 2) {
                    this.rulesRepeatDescription = turno.template_user.rules_repetition.descripcion;
                  } else {
                    this.rulesRepeatDescription = "El día " + turno.template_user.rules_repetition.descripcion;
                  }
                }
                if(turno.template_user.rules_repetition.dias_repeticion) {

                  this.daysRepeat = turno.template_user.rules_repetition.dias_repeticion.split(",");
                  if(this.id_repeticion == REPETITIONS.PERSONALIZADO) {
                    this.rulesRepeat = JSON.parse(turno.template_user.rules_repetition.descripcion_regla)[0];
                  }
                  this.daysBtns.forEach(dayBtn => {
                    let findedDay = this.daysRepeat.find(dayRepeat => dayBtn.fulltxt === dayRepeat);
                    if(findedDay) {
                      dayBtn.active = true;
                    } else {
                      dayBtn.active = false;
                    }
                  });

                }
                else if(this.id_repeticion == REPETITIONS.PERSONALIZADO) {
                  this.rulesRepeat = JSON.parse(turno.template_user.rules_repetition.regla)[0];
                }
              }

  ngOnInit(): void {
    
    this.userRol = JSON.parse(SessionManagerService.getItem('userClaro')).role;
    this.dialogRef.updatePosition({ top: `20px` });
    this.subtitle = "A partir de las " + this.turno.horario_desde + " | " + this.nameTurn;
    this.canEdit();

    this.eventEmitterUnsuscribe = this.dataobsservice.refreshGrid.subscribe(() =>{
      this.closeModal();
    });
  }
  closeModal() {
    this.dialogRef.close();
  }
  openDeleteTurnDialog() {
    const dialogConfig = new MatDialogConfig();
    let id_plantilla_usuario = this.dataTurn.id_plantilla_usuario
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = "container-custom-modal";

    dialogConfig.data = { 
      id_plantilla_usuario,
      turno: this.dataTurn,
    };
    
    const dialogRef = this.dialog.open(ModalDeleteTurnComponent, dialogConfig);
  }
  
  openEditTurnDialog() {
   
    const dialogConfig = new MatDialogConfig();
    let id_plantilla_usuario = this.dataTurn.id_plantilla_usuario
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component-edit";
    dialogConfig.panelClass = "container-custom-modal";
    dialogConfig.width = "370px";
    dialogConfig.data = { 
      id_plantilla_usuario,
      datosTurno: this.dataTurn,
      id_usuarioSelected: this.dataTurn.turno.template_user.user.idusuario,
      guards: this.dataTurn.guardias,
      type: 'asignar-turno',
      name: "editar turno",
      partialEdition: this.partialEdition,
      edit: true,
    };
    const dialogRef = this.dialog.open(ModalTurnoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.closeModal()
    })
  }

  canEdit(): void {

    if( this.timeIsAvailable(this.dataTurn.turno) ) {

      const admins = ['jefe-guardia','jefe','admin-jefe'];
      const turnBelongsUser = this.dataTurn.turno.idusuario == SessionManagerService.user().id_usuario;

      if(admins.includes(this.userRol) || turnBelongsUser){
        this.isEditable = true;
      }

      else if(this.userRol === 'guardia' && !turnBelongsUser){
        this.isEditable = true;
        this.partialEdition = true;
      }
      
    }

  }

  timeIsAvailable(turnSelected) : boolean {
    const { end } = this.transformInRealDates(turnSelected);    
    const now = moment().toDate();
    return  now <= end;
  }

  transformInRealDates({dia,horario_desde,horario_hasta}){
    return transformStringInDates(dia,horario_desde,horario_hasta);
  }

  openDeleteRepetitionsDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component-delete";
    dialogConfig.panelClass = "container-custom-modal";
    dialogConfig.width = "360px";
    dialogConfig.data = { turno: this.dataTurn };
    
    const dialogRef = this.dialog.open(ModalDeleteRepetitionsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result['confirm']) {
        const range = this.parseDateRangeFromTurn(result['checkbox'],this.dataTurn);
         this.turnosService.deleteTurn(this.dataTurn['id_plantilla_usuario'],range).subscribe(() => {
           this.notification(this.dataTurn['turno']['template_user']['user']).subscribe();
           this.dataobsservice.refreshGrid.emit()
        })
      }
    })
  }

  notification(guard:any) {
    const {idusuario ,apellido, nombre} = guard;
    const date = moment().format('DD/MM/YYYY HH:mm');

    return this.notificationsService.send({
      idususol:SessionManagerService.user().id_usuario,
      idusurecep:idusuario,
      mensaje:`${apellido}, ${nombre} se eliminaron guardias el dia ${date}`
    })
  }

  parseDateRangeFromTurn(deleteThisTurn: boolean, turn:any): any {
    let daySelected = moment(turn['turno']['dia']).format('YYYY-MM-DD');
    let from = moment( daySelected + ' ' + turn['turno']['horario_desde'] );
    let to = moment( turn['turno']['template_user']['fecha_repeticion_hasta'] );

    if(!deleteThisTurn) {
      from = from.add('days',1);
    }
    
    const format = 'YYYY-MM-DD HH:mm:ss';

    return {
      fecha_repeticion_inicia:from.format(format),
      fecha_repeticion_hasta:to.format(format)
    }
  }

  ngOnDestroy(): void {
    this.eventEmitterUnsuscribe?.unsubscribe();
  }

}
