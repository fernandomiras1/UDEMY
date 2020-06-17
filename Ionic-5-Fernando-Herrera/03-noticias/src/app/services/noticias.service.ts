import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../models/interface';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  // necesitamos reinicar el contador de la pagia por cada categoria.
  categoriaActual = '';
  categoriaPage = 0;
  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&page=${this.headlinesPage}`);
  }

  getTopHeadlinesByCategory(category: string) {
    if ( this.categoriaActual === category) {
      this.categoriaPage ++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = category;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&category=${category}&page=${this.categoriaPage}`);
  }
}
