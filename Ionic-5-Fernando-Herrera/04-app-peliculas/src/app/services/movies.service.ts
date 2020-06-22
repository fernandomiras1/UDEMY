import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaMDB } from '../models/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  api_key= environment.apiKey
  constructor(private http: HttpClient) { }

  getFeature() {
    return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-01-31&api_key=9f3b844fce4277406695a3f819f02fb9&language=es&include_image_language =es`)

  }
}
