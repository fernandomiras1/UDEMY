import { Injectable } from '@angular/core';
import { DtoClient } from '../../models/entities/DtoClient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ClientService {

  _baseUrl = environment.apiUrl;
  _url = this._baseUrl + 'api/clients/search';
  constructor(private http: HttpClient) { }

  getClient(name: string): Observable<DtoClient[]> {
   const filtro = this.body(name);
   return this.http.post<DtoClient[]>(this._url, filtro);
 }

 getClientbyId(id: number): Observable<any> {
   const url = this._baseUrl + 'api/clients/';
   return this.http.get<any>(url + id);
 }

 body(name: string) {
  const filtro: any = {};
  // filtro.ClientId = 1;
  filtro.SearchValue = name;
  return filtro;
}

}
