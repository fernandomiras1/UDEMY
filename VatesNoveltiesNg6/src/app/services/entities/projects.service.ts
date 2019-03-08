import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DtoProjects } from '../../models/entities/DtoProjects';

@Injectable()
export class ProjectsService {

  _baseUrl = environment.apiUrl;
  _url = this._baseUrl + 'api/projects/search';
  constructor(private http: HttpClient) { }

  getProjects(name: string, clientId?: number, employeeId?: number): Observable<DtoProjects[]> {
  const filtro = this.body(name, clientId, employeeId);

  return this.http.post<DtoProjects[]>(this._url, filtro);
  }

  getProjectbyId(id: number): Observable<DtoProjects> {
    const url = this._baseUrl + 'api/projects/';
    return this.http.get<DtoProjects>(url + id);
  }

  body(name: string, clientId: number, employeeId: number) {
    const filtro: any = {};
    filtro.ClientId = clientId;
    filtro.SearchValue = name;
    filtro.EmployeeId = employeeId;
    return filtro;
  }
}
