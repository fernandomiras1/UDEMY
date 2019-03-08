import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISalaryToPayFilterData, SalaryToPayListModel } from 'src/app/models/entities/SalaryToPayDTOs';
import { IDialogNovely } from 'src/app/models/ui/DialogData';

@Injectable({
  providedIn: 'root'
})
export class SalaryToPayService {
  private _url = environment.novApiUrl + 'api/salarytopay/';

  constructor(private _http: HttpClient) {}

  public getByFilters(filtersData: ISalaryToPayFilterData, pageNumber: number): Observable<SalaryToPayListModel> {
    const url = this._url + 'getbyfilters';

    return this._http.post<SalaryToPayListModel>(url, {
      filters: filtersData,
      pageNumber: pageNumber
    });
  }

  public justified(item: IDialogNovely): Observable<any> {
    const url = this._url + 'justified';

    return this._http.post<any>(url, item);
  }

  public payed(item: IDialogNovely): Observable<any> {
    const url = this._url + '/payed';

    return this._http.post<any>(url, item);
  }

  public reconcile(item: IDialogNovely): Observable<any> {
    const url = this._url + '/reconcile';

    return this._http.post<any>(url, item);
  }

  public processFile(fileName: string): Observable<any> {
    return this._http.post(this._url + 'processFile', { SearchValue: fileName });
  }

  public getTotalByFilters(filtersData: ISalaryToPayFilterData): Observable<number> {
    const url = this._url + '/getTotalByFilters';

    return this._http.post<number>(url, filtersData);
  }

  public salaryToPayByFilters(filtersData: ISalaryToPayFilterData): Observable<any> {
    const url = this._url + '/salaryToPayByFilters';

    return this._http.post<any>(url, filtersData);
  }

  public reconcileByFilters(filtersData: ISalaryToPayFilterData): Observable<any> {
    const url = this._url + '/reconcilebyfilters';

    return this._http.post<any>(url, filtersData);
  }
}
