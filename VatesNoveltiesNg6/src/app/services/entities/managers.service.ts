import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DtoManagers } from '../../models/entities/DtoManagers';

@Injectable()
export class ManagersService {

  _baseUrl = environment.apiUrl;
  _url = this._baseUrl + 'api/managers';
  constructor(private http: HttpClient) { }

  getManagers(): Observable<DtoManagers[]> {
    return this.http.get<DtoManagers[]>(this._url);
  }
}
