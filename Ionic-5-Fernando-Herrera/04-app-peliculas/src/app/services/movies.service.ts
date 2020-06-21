import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  api_key= environment.apiKey
  constructor(private http: HttpClient) { }

  getFeature() {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.api_key}&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22`)

  }
}
