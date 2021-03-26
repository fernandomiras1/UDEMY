import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { environment } from '../../environments/environment';
const URL = environment.URL + "/api";

@Injectable({
  providedIn: 'root'
})
export class SigosLogService {

  constructor(
    private http: HttpClient, 
    private generalService: GeneralService
  ) { }
  
  show({phone,quantity}) {

    const data = { number_id:phone,cantidad:quantity};

    return this.http.post(`${URL}/sigos/log/byNum`,data,{ headers: this.generalService.headers });
  }

  save({number_id,user_name,country}) {
    const data = { 
      number_id,
      user_name,
      frecuencia:"QUINCENAL",
      country
    }
    return this.http.post(`${URL}/sigos/save`,data,{ headers: this.generalService.headers });
  }

  validate(phoneNumber:string) {
    const data = {number_id:phoneNumber}
    return this.http.post(`${URL}/sigos/validate`,data,{ headers: this.generalService.headers });
  }
}

