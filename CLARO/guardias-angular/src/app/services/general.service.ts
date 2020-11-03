import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionManagerService } from './session-manager.service';
import { RemedyUser, RespRemedyGroups } from '../models/group.model';
import { map, tap } from 'rxjs/operators';

const URL = environment.URL + '/api';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  widthScreen = window.screen.width - 50;
  token;
  user;
  headers;
  formDataHeader;
  initialObj;

  public remedyUsersSites: RemedyUser[] = [];
  public remedyUsersTech: RemedyUser[] = [];
  public remedyGroupsSites: RespRemedyGroups;
  public remedyGroupsTech: RespRemedyGroups;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    if (this.router.url !== '/login') {
      this.init();
    }
  }

  init() {
    this.user = this.getUser();
    this.headers = this.createHeader();
    this.formDataHeader = this.createHeaderFormData();
  }

  async setIninitalStateObj(obj: object) {
    this.initialObj = JSON.stringify(obj);
  }

  getIninitalStateObj() {
   return JSON.parse(this.initialObj);
  }

  getUser() {
    const user = SessionManagerService.getItem('userClaro');
    if (user) {
      return JSON.parse(user);
    }
  }

  getToken() {
    const token = SessionManagerService.getItem('authClaro');
    if (token) {
      return JSON.parse(token).token;
    }
  }

  getCountries(): Observable<any> {
    return this.http.get(`${URL}/countries/index`, { headers: this.headers });
  }

  getRemedyUsers(paramSearchUser?: string): Observable<any> {
    if (this.remedyUsersSites.length > 0 && !paramSearchUser) {
      return of(this.remedyUsersSites);
    }

    const param = paramSearchUser ? paramSearchUser : 'index';
    return this.http.get(`${URL}/remedy_users/${param}?group_by=SUPPORT_GROUP_NAME&group_type=Sitio&order_by=apellido&id_user=` + this.user['id_usuario'],{ headers: this.headers }).pipe(
      tap((resu: any) => {
        if (!paramSearchUser && resu.success) {
          this.remedyUsersSites = this.orderBySurname(Object.values(resu.message));
        }
      }),
      map((resu: any) => resu.success ? this.orderBySurname(Object.values(resu.message)): [])
    );
  }

  getRemedyTech(paramSearchUser?: string): Observable<any> {
    if (this.remedyUsersTech.length > 0 && !paramSearchUser) {
      return of(this.remedyUsersTech);
    }

    const param = paramSearchUser ? paramSearchUser : 'index';
    return this.http.get(`${URL}/remedy_users/${param}?group_by=SUPPORT_GROUP_NAME&group_type=Tecnologia&order_by=apellido&id_user=` + this.user['id_usuario'], { headers: this.headers }).pipe(
      tap((resu: any) => {
        if (!paramSearchUser) {
          this.remedyUsersTech = this.orderBySurname(Object.values(resu.message));
        }
      }),
      map((resu: any) => resu.success ? this.orderBySurname(Object.values(resu.message)) : [])
    );
  }

  getTechTechnology(): Observable<any> {
    if (this.remedyGroupsTech) {
      return of(this.remedyGroupsTech);
    }

    return this.http.get(`${URL}/technologies/by_organization_remedy/${this.user['organization_remedy']}`, { headers: this.headers }).pipe(
      tap(resu => this.remedyGroupsTech = resu)
    );
  }

  getUpdateAssignment(isSite: boolean, type: string, owner: any): Observable<any> {
    const link = type === 'remedy' ? `${URL}/claro_sites/by_owner/` : `${URL}/claro_sites/by_user/`;
    const url = isSite ? link + owner : `${URL}/technologies/by_grupo_remedy/`;

    return this.http.get(url, { headers: this.headers });
  }

  getRemedyGroups(paramSearchSite?: string): Observable<any> {
    if (this.remedyGroupsSites && !paramSearchSite) {
      return of(this.remedyGroupsSites);
    }

    const param = paramSearchSite ? paramSearchSite : 'index';
    return this.http.get(`${URL}/claro_sites/${param}?id_user=` + this.user['id_usuario'], { headers: this.headers }).pipe(
      tap(resu => {
        if(!paramSearchSite) {
          this.remedyGroupsSites = resu;
        }
      })
    );
  }
  
  getGroupsByOwner(id_User: string): Observable<any> {
    return this.http.get(`${URL}/claro_sites/by_owner/${id_User}`, { headers: this.headers }).pipe(
      map((resu: any) => resu.message)
    );
  }

  async clearClaroStorage() {
    await SessionManagerService.removeItem('userClaro');
    await SessionManagerService.removeItem('authClaro');
    await SessionManagerService.removeItem('gridNavigation');
    await SessionManagerService.removeItem('phone-notification');
    this.router.navigateByUrl('login');
  }
  checkValidacionTelefonica() {
    return this.http.get(`${URL}/config-general/validate-sigos/show`, { headers: this.headers });
  }
  validacionTelefonica(value) {
    const data = {
      id_user_login:  this.user.id_usuario,
      activate_sigos: value
    };
    return this.http.post(`${URL}/config-general/validate-sigos/store`, data, { headers: this.headers });
  }
  createHeader() {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'authenticate': `${token}`,
      'Content-Type': `application/json`
    });
    return headers;
  }
  createHeaderFormData() {
    const token = this.getToken();
    const headers = new HttpHeaders({
      authenticate: token,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest'
    });
    return headers;
  }
  overlappedDate(fecha_inicio1, fecha_fin1, fecha_inicio2, fecha_fin2): boolean {
    fecha_inicio1 = moment(fecha_inicio1).format('YYYY-MM-DD 00:00:00');
    fecha_fin1 = moment(fecha_fin1).format('YYYY-MM-DD  23:59:59');
    fecha_inicio2 = moment(fecha_inicio2).format('YYYY-MM-DD HH:mm:ss');
    fecha_fin2 = fecha_fin2 ? moment(fecha_fin2).format('YYYY-MM-DD HH:mm:ss') : moment(fecha_fin1).add(2, 'years').format('YYYY-MM-DD HH:mm:ss');

    if (fecha_inicio2 <= fecha_inicio1 && fecha_fin2 >= fecha_inicio1 && fecha_fin2 <= fecha_fin1 ) {
      return true;
    } else if (fecha_inicio2 >= fecha_inicio1 && fecha_fin2 <= fecha_fin1 ) {
      return true;
    } else if (fecha_inicio2 >= fecha_inicio1 && fecha_inicio2 <= fecha_fin1  && fecha_fin2 >= fecha_fin1) {
      return true;
    } else if (fecha_inicio2 <= fecha_inicio1 && fecha_fin2 >= fecha_fin1) {
      return true;
    } else {
      return false;
    }
  }
  
  titlecase(value: string): string {
    if (value) {
      return value.toLocaleLowerCase()
        .trim()
        .split(' ')
        .map(item => {
          return item.charAt(0).toUpperCase() + item.slice(1);
        })
        .join(' ');
    }
  }

  errorConnection() {
    this._snackBar.open('¡Error de conexión!', 'Reiniciar', {
      duration: 3000000,
      panelClass: ['bg-color-claro', 'txt-white']
    }).onAction().subscribe(() => window.location.reload());
  }

  destroyMemoryAPI() {
    this.remedyUsersSites = [];
    this.remedyUsersTech = [];
    this.remedyGroupsSites = null;
    this.remedyGroupsTech = null;
  }

  orderBySurname(remedyUsers: any[]): RemedyUser[] {
    remedyUsers.map(group => {
      const unordered = {};
      const ordered = {};
      Object.values(group.usuarios).forEach( user => {
        const key = user['apellido'].replace(' ', '').toLowerCase();
        unordered[key] = user;
      });

      Object.keys(unordered).sort().forEach(key => {
        ordered[key] = unordered[key];
      });
      group.usuarios = Object.values(ordered);
   });

    return remedyUsers;
  }

}
