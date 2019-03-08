import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DtoEmployee, EmployeeDetail, EmployeeCruise } from '../../models/entities/DtoEmployee';

@Injectable()
export class EmployeeService {

  _baseUrl = environment.apiUrl;
  _url = this._baseUrl + 'api/employees';
  constructor(private http: HttpClient) { }

  getEmployee(name: string): Observable<DtoEmployee[]> {
    const filtro = this.body(name);
    const url = environment.novApiUrl + 'api/employees/search';
    return this.http.post<DtoEmployee[]>(url, filtro);
  }

  body(name: string) {
    const filtro: any = {};
    filtro.SearchValue = name;
    return filtro;
  }

  getResourceInfoById(id: number): Observable<EmployeeDetail[]> {
   const url = environment.novApiUrl + 'api/employees/' + id + '/resourceinfo';
    return this.http.get<EmployeeDetail[]>(url);
  }

  getResourceInfo(id: number, year: number, month: number): Observable<EmployeeDetail[]> {
    const url = environment.novApiUrl + 'api/employees/' + id + '/resourceinfo/' + year + '/' + month;
     return this.http.get<EmployeeDetail[]>(url);
   }

  getCruiseById(id: number): Observable<EmployeeCruise[]> {
    const url = this._url + '/' + id + '/crucero';
    return this.http.get<EmployeeCruise[]>(url);
  }

  getCruisingSalaryInfo(employeeId: number, year: number, month: number): Observable<EmployeeCruise[]> {
    const url = this._url + '/' + employeeId + '/crucero/' + year + '/' + month;
    return this.http.get<EmployeeCruise[]>(url);
  }

}
