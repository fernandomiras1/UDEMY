import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GeneralService } from './general.service';
import { SessionManagerService } from './session-manager.service';
import * as moment from 'moment';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { forkJoin, of } from 'rxjs';
import { GroupSites } from '../models/group.model';

const URL = environment.URL + "/api";

@Injectable({
  providedIn: 'root'
})
export class PlantillasService {
  userId;
  constructor(
    private http: HttpClient,
    private generalService: GeneralService
  ) {
    this.userId = JSON.parse(SessionManagerService.getItem('userClaro')).id_usuario;
  }

  getPlantillasServer() {
    return this.http.get(`${URL}/grilla-group/service`, { headers: this.generalService.headers });
  }

  getTemplates() {
    return this.http.get(`${URL}/grilla-group/service`, { headers: this.generalService.headers })
                .pipe( map((response:any) => this.mapInBlocks(response.message)));
  }

  private mapInBlocks(templates) {
    let blocks = {
      1:[],
      2:[],
      3:[],
      4:[]
    };
  
    for (let template of templates) {
      const key = template.rango_hour.length;
      template.selected = false;
      if (blocks[key]) {
        blocks[key].push(template);
      } else {
        blocks[key] = [template];
      }
    }

    return blocks;
  }

  addPlantillaGroup(plantillas, id_grupo) {

    const data = this.createArrayPlantillas(plantillas,id_grupo);

    return this.http.post(`${URL}/grilla-group/relation-group`, data, { headers: this.generalService.headers });

  }
  createArrayPlantillas(plantillas, id_grupo) {

    const data = { templates: [] };

    plantillas.forEach(id_tipoguardia => {
      data.templates.push({
        id_grupo,
        id_tipoguardia,
        user: this.userId,
      });
    });

    return data;
   }
   addUsersSiteTecGroup(id_grupo, nombre, descripcion, newGroup) {
    const usuarios = [];
    const sitios = [];
    newGroup.users.forEach(user => {
      const estado = user.estado === 0 ? 0 : 1;
      usuarios.push({id_grupo, id_usuario: user.idusuario, estado, usuario_creador: this.userId});
    });
    newGroup.sites.forEach(sitioTec => {
      const estado = sitioTec.estado === 0 ? 0 : 1;
      sitios.push({id_grupo, alcance: sitioTec.name ? sitioTec.name : sitioTec.tecnologia, estado, usuario_creador: this.userId});
    });
    const body = {
      id_grupo,
      descripcion,
      nombre,
      usuarios,
      sitios,
    };

    return this.http.post(`${URL}/group/service/store`, body, { headers: this.generalService.headers });
  }


  saveGroup(newGroup) {
    const body = {
      "nombre_grupo": newGroup['data']['zonegroupName'],
      "id_tipo_grupo": newGroup['type'] === 'sitio' ? "1" : "2",
      "estado": "1",
      "descripcion": newGroup['data']['description'],
      "linea_rotativo": newGroup['data']['numberRotary'],
      "celular_guardia_requerido": newGroup['data']['numberGuard'],
      "celular_corporativo_requerido": newGroup['data']['numberCorpGuard'],
      "linea_rotativo_requerido": newGroup['data']['shownumberRotary'],
      "usuario_creador": this.userId,
      "categories": newGroup['data']['categories'],
      "isGroup": newGroup['data']['isGroup'],
      "nameGroup": newGroup['data']['nameGroup'],
      "distributionList": newGroup['data']['distributionList'],
    };

    return this.http.post(`${URL}/group/service`, body, { headers: this.generalService.headers });
  }
  deleteGroup() {
    const body = {
      "date_now": moment().format('YYYY-MM-DD HH:mm'),
      "id_user_login": this.userId,
      "id_group": "62",
      "users":{
        "0":{
          "id_user_group":"1097"
        },
      }
    }
    return this.http.post(`${URL}/grilla-group/verify-guard-assignments`, body, { headers: this.generalService.headers });
  }
  addPlantilla(data) {
    data.user = this.userId;
    return this.http.post(
      `${URL}/grilla-group/service`,
      JSON.stringify(data),
      { headers: this.generalService.headers }
    );
  }
  verifyGroupsInPlantilla(idPlantilla) {
    return this.http.get(`${URL}/grilla-group/verify-groups-asignated/${idPlantilla}`, { headers: this.generalService.headers });
  }
  removePlantilla(idPlantilla) {
    return this.http.request('delete', `${URL}/grilla-group/destroy/${idPlantilla}`,
      {
        headers: this.generalService.headers,
        body: {
          state: '0',
          user: this.userId
        }
      }
    );
  }
}
