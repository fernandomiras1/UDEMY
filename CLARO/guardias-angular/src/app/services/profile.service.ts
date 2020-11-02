import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { environment } from '../../environments/environment';
const URL = environment.URL + "/api";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient, 
    private generalService: GeneralService
  ) { }
  
  getById(id: string) {
    return this.http.get(`${URL}/user/profile/${id}`, { headers: this.generalService.headers });
  }

  save(id:string,{celular_corporativo,celular_guardia,telefono_fijo}) {

    let data =  {
      celular_corporativo,
      celular_guardia,
      telefono_fijo,
      estado: 1
    }

    return this.http.post(`${URL}/user/profile/${id}`,data, { headers: this.generalService.headers });
  }
  
}