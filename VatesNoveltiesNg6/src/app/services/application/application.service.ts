import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, ModeEnum } from '../../../environments/environment';
import { EnumService } from '../../models/enumService';

export const DEFAULT_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Injectable()
export class ApplicationService {
  public static currentModeStatus: ModeEnum;
  public static currentId: number;

  public currentStatus: number;

  // Variables de Configuración Globales
  public maxLengthAutoComplete = 3;
  _baseUrl = environment.novApiUrl;
  _url = this._baseUrl + 'api/';
  onChangeStatusCallback: Observable<any>;
  constructor(private http: HttpClient) { }

  getNoveltyStatus(): Observable<EnumService[]> {
    const url = this._url + 'enums/novelties/status';
    return this.http.get<EnumService[]>(url);
  }

  getCruisingSalaryStatus(): Observable<EnumService[]> {
    const url = this._url + 'enums/cruisingsalary/status';
    return this.http.get<EnumService[]>(url);
  }

  getNoveltyTypes(): Observable<EnumService[]> {
    const url = this._url + 'enums/novelties/types';
    return this.http.get<EnumService[]>(url);
  }

  getLiquidateStatus(): Observable<EnumService[]> {
    const url = this._url + 'enums/liquidate/status';
    return this.http.get<EnumService[]>(url);
  }

  changeViewStatus(status: ModeEnum, callback?: Observable<any>) {
    this.onChangeStatusCallback = callback;
  }
}
