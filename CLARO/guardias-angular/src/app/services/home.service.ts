import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GeneralService } from './general.service';
import { optGroupService } from '../interfaces/home';

const URL = environment.URL + "/api";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient, 
              private generalService: GeneralService) { }
 
  getNoc(order: string = 'ASC',limit:number = 10, type_view:string, page: number = 1, string_search: string = '',lastname_search:string = '', only_with_assignments: boolean = true, technology_site_order:string = '') {
    const body = {
      "lastname_order": order,
      "group_order":order,
      "type_view": type_view,
      "page": page.toString(),
      "limit": limit,
      "string_search": string_search,
      "lastname_search": lastname_search,
      "only_with_assignments": only_with_assignments.toString(),//checkbox "Ver sólo cubiertos"
      "technology_site_order": technology_site_order,//si es sitio o tecnologia
    }
    return this.http.post(`${URL}/vista-noc`, body, { headers: this.generalService.headers });
  }
  getGroup(group_order:string = 'ASC', limit:number = 10, page: number = 1,  string_search:string = '', only_my_groups:boolean = true, string_exact_group_name:boolean = false) {
    const body = {
      "group_order":group_order, //orden de los grupos
      "page": page.toString(), //numero de pagina
      "limit":limit, //cantidad de registros por pagina
      "string_search":string_search, //string para busqueda exacta
      "only_my_groups": only_my_groups ? 1 : 0, // checkbox "Ver solo mis grupos"
      "string_exact_group_name": string_exact_group_name //activa busqueda exacta
    }
    return this.http.post(`${URL}/group-list`, body, { headers: this.generalService.headers });
  }

  deleteGroup(id_grupo:string,usuario_creador:string){

    const body = {
      id_grupo:id_grupo,
      estado:0,
      usuario_creador:usuario_creador
    }
    
    return this.http.post(`${URL}/group/service/update/${id_grupo}`, body, { headers: this.generalService.headers });
  }

  userInfo(userID:string) {
    return this.http.get(`${URL}/user/info/${userID}`, { headers: this.generalService.headers });
  }
}
