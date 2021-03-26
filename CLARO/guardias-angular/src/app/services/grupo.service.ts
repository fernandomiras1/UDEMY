import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GeneralService } from './general.service';
import { map } from 'rxjs/operators';

const URL = environment.URL + "/api";

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient,
              private generalService: GeneralService) { }

  getDetailGroup(id: string) {
    return this.http.get(`${URL}/group/detail/${id}`, { headers: this.generalService.headers })
    .pipe(
      map(this.mapTemplatesWithInitialValues)
    );
  }
  getPlantillas() {
    return this.http.get(`${URL}/grilla-group/service`, { headers: this.generalService.headers });
  }

  private mapTemplatesWithInitialValues(response:any) {
      
    let group = response.message;

    const templatesMaped = 
      Object.values(group.plantilla_tipo_guardia)
      .map((template:any) => {
        template.estado = 1;
        template.itIsSavedInDatabase = true;
        return template;
      });                      
    
      group.plantilla_tipo_guardia = templatesMaped;

      return group;
  }

  private booleanToString(val) {
    if(val != null) {
      if(val == '1' || val == true) {
        return "true";
      }
      else if(val == '0' || val == false) {
        return "false";
      }
    }
    return "false";
  }

  saveDetailGroup(id: string, data: any) {
    const { dataGroup, plantillaChanges, categories } = data;
  
    const info = {
      nombre_grupo: (dataGroup.nombre_grupo && dataGroup.nombre_grupo.toString()) || '',
      linea_rotativo: (dataGroup.linea_rotativo && dataGroup.linea_rotativo.toString()) || '',
      celular_guardia_requerido: this.booleanToString(dataGroup.celular_guardia_requerido),
      celular_corporativo_requerido: this.booleanToString(dataGroup.celular_corporativo_requerido),
      linea_rotativo_requerido: this.booleanToString(dataGroup.linea_rotativo_requerido),
      usuario_creador: (dataGroup.id_usuario_jefe && dataGroup.id_usuario_jefe.toString()) || '',
      descripcion: (dataGroup.descripcion && dataGroup.descripcion.toString()) || '',
      plantilla_horario:plantillaChanges,
      categories: categories,
      programacion_grupal: dataGroup.programacion_grupal,
      lista_distribucion: dataGroup.lista_distribucion,
    };
    
    return this.http.put(`${URL}/group/service/${id}`, info, { headers: this.generalService.headers })
    .pipe(
      map(this.mapTemplatesWithInitialValues)
    );
  }

  verifyGuardAssignments(data: any) {
    return this.http.post(`${URL}/grilla-group/verify-guard-assignments`, data, { headers: this.generalService.headers });
  }

  guardReassignments(data:any) {
    return this.http.post(`${URL}/groups/save-guard-re-assignments`,data, { headers: this.generalService.headers });
  }

  joinGroup(data:any) {
    return this.http.post(`${URL}/groups/deactivate-user-by-group-validate-asignations`, data, { headers: this.generalService.headers });
  }

  checkRemedyGroup(group_id:string){
    return this.http.get(`${URL}/groups/check-union/${group_id}`, { headers: this.generalService.headers });
  }

  getSubCategories() {
    return this.http.get(`${URL}/group/types-group`, { headers: this.generalService.headers }).pipe(
      map((data: {success: boolean, message: any}) => data.message)
    );
  }
}
