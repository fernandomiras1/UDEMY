import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaMDB } from '../models/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  apiKey= environment.apiKey
  URL = environment.url;
  constructor(private http: HttpClient) { }


  private ejecutarQuery<T>(query: string) {
    query = this.URL + query;
    query += `&api_key=${this.apiKey}&language=es&include_image_language =es`;

    return this.http.get<T>(query);
  }

  getFeature() {
    const hoy  = new Date();
    // la fecha del ultimo dia del mes.
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;

    if ( mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${ mesString }-01`;
    const fin = `${hoy.getFullYear()}-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares() {
    const query = '/discover/movie?sort_by=popularity.desc';
    return this.ejecutarQuery<RespuestaMDB>(query);
  }
}
