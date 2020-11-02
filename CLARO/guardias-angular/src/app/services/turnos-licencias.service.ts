import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GeneralService } from './general.service';
import { SessionManagerService } from './session-manager.service';
import * as moment from 'moment';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';


const URL = environment.URL + "/api";

@Injectable({
  providedIn: 'root'
})
export class   TurnosLicenciasService {
  constructor(private http: HttpClient, 
              private generalService: GeneralService) {
               }

  
  getPlanningCalendar(dates: any [], only_my_groups = "1", show_only_group_id = "") {
    const date_start = moment(dates[0]['nextDay']).format('YYYY-MM-DD HH:mm:ss');
    const date_end = moment(dates[dates.length - 1]['nextDay']).format('YYYY-MM-DD HH:mm:ss');
    let id = this.generalService.getUser().id_usuario
    const body = {
      "date_start": date_start,
      "date_end": date_end,
      "id_user": id,
      "show_only_group_id":show_only_group_id,
      "only_my_groups": only_my_groups,
    }
    return this.http.post(`${URL}/grilla-group/planning-calendar-groups`, body, { headers: this.generalService.headers });
  }
  getGroupGuards(idGroup: string, date) {
    const legajo = this.generalService.user.legajo;
    return this.http.get(`${URL}/user/list-users/${idGroup}/${legajo}/${date}`, { headers: this.generalService.headers });
  }
  dropdownAsignation() {
    return this.http.get(`${URL}/grilla-group/dropdown/asignacion_guardia`, { headers: this.generalService.headers });
  }
  statusGuardsCarousel(user, licencias, dateSelected): string {
    let isLicensed = licencias.find(userLicence => userLicence.idusuario == user.id_usuario);
    if(user.telefono_validado == 1 && !isLicensed){
      if (JSON.parse(SessionManagerService.getItem('userClaro')).role === 'guardia') {
        if(user.id_usuario !== this.generalService.user.id_usuario) {
          return 'disable';
        } else {
          return 'active';
        }
      } else {
        return 'active';
      }
    } else if(user.telefono_validado == 0) { 
      return 'disable';
    } else {
      if(isLicensed) {
        if(this.generalService.overlappedDate(dateSelected, dateSelected, isLicensed.fecha_desde, isLicensed.fecha_hasta)) {
          return 'license';
        }
      } else {
        if (this.generalService.user.role === 'guardia') {
          if(user.id_usuario !== this.generalService.user.id_usuario) {
            return 'disable';
          } else {
            return 'active';
          }
        } else {
          return 'active';
        }
      }
    }
  }
  setObjAsignDelete(obj, id_plantilla_usuario?) {
    let dias_repeticion;
    for (let index = 0; index < obj.dias_repeticion.length; index++) {
      if(dias_repeticion) {
        dias_repeticion += "," + obj.dias_repeticion[index];
      } else {
        dias_repeticion = obj.dias_repeticion[index];
      }
    }
    this.generalService.getUser();
    this.generalService.user.id_usuario;
    let descripcion;
    let dia_todos_los_meses = [ 
      {
        dia: null
      }
    ];
    if(obj.footerRepeatDaysMonth.value) {
      if(obj.footerRepeatDaysMonth.value.split("de")[0].split("día")[1]) {
        descripcion = obj.footerRepeatDaysMonth.value.split("de")[0].split("día")[1];
        dia_todos_los_meses[0].dia = obj.footerRepeatDaysMonth.value.split("de")[0].split("día")[1];
      } else {
        descripcion = obj.footerRepeatDaysMonth.value.split("de")[0];
        dia_todos_los_meses[0].dia = 'asignado';
      }
    }
    let fecha_inicio = moment(obj.turno.dia);
    let fecha_repeticion_hasta = moment(obj.selectDayCalendar).add(obj.turno.minutos, 'minute');
    let body = {
        id_user_asignado: obj.guard.id_usuario,
        id_user: this.generalService.user.id_usuario,
        id_plantilla_tipo_guardia: obj.turno.id_tipoguardia,
        id_horario_grupo: obj.turno.id_horario_grupo,
        fecha_inicio: fecha_inicio.format('YYYY-MM-DD HH:mm:ss'),
        fecha_repeticion_hasta: fecha_repeticion_hasta.format('YYYY-MM-DD HH:mm:ss'),
        fecha_repeticion_hasta_real: fecha_repeticion_hasta.format('YYYY-MM-DD HH:mm:ss'),
        id_rango_horario: obj.turno.id_rango_horario,
        id_dropdown_repeticion: obj.id_dropdown_repeticion,
        id_grupo: obj.turno.id_grupo,
        dias_repeticion,
        descripcion,
    };
    if(obj.id_dropdown_repeticion == '4') {
      body['dia_todos_los_meses'] = dia_todos_los_meses;
    } else if(obj.id_dropdown_repeticion == '5') {
      body['personalizado_cada'] = obj.personalizado_cada;
    } else if(id_plantilla_usuario) {
      body['id_plantilla_usuario'] = id_plantilla_usuario;
    }
    return body
  }
  blockRepeatTurn(id_plantilla_usuario, isEdit: boolean) {
    let estado_bloquea_repeticion = isEdit ? 1 : 0;
    const body = {
      id_plantilla_usuario,
      estado_bloquea_repeticion
    }
    return this.http.post(`${URL}/grilla-group/locked-repeat`, body, { headers: this.generalService.headers });
  }
  asignGuard(obj) {
    return this.http.post(`${URL}/grilla-group/asignated-user-rule`, this.setObjAsignDelete(obj), { headers: this.generalService.headers });
  }
  updateAsignGuard(obj, id_plantilla_usuario) {
    return this.http.post(`${URL}/grilla-group/asignation-user/update`, this.setObjAsignDelete(obj, id_plantilla_usuario), { headers: this.generalService.headers });
  }
  deleteTurn(id_plantilla_usuario, fechas) {
    const body = {
      id_plantilla_usuario,
      fecha_inicial: fechas.fecha_repeticion_inicia,
      fecha_final:fechas.fecha_repeticion_hasta,
    }
    return this.http.post(`${URL}/grilla-group/disable-repeat`, body, { headers: this.generalService.headers });
  }
  checkCollisions(obj) {
    return this.http.post(`${URL}/grilla-group/planning-calendar/verifica-colisiones`, this.setObjAsignDelete(obj), { headers: this.generalService.headers })
    .pipe(
      map((response:any) => { 
        response.message.collisions = this.mapCollisionByMonths(response.message.collisions);
        return response;
      })
    )
  }

  private mapCollisionByMonths(collisions) {
    let collisionByMonths = {};
    let collisionsArray = [];

    for(let col of collisions) {
      const desde = col.collision_user.fecha_desde;
      const key   = moment(desde).format('Y-MM') + '-01';
      
      if( collisionByMonths[key] ) {
        collisionByMonths[key].push(col)
      }
      else {
        collisionByMonths[key] = [col]
      }
    }

    Object.keys(collisionByMonths).forEach((month)=>{
        collisionsArray.push({
          month: month,
          values: collisionByMonths[month] 
        })
    })

    return collisionsArray;
  }

  confirmCollisions(obj) {
    return this.http.post(`${URL}/grilla-group/asignated-user-rule`,obj, { headers: this.generalService.headers });
  }
}
