import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICruisingSalaryManagerFilter, CruisingSalaryListModel, ISalaryDistributionBindingModel } from '../../models/entities/CruisingSalaryDTOs';
import { IDialogNovely } from 'src/app/models/ui/DialogData';

@Injectable({
  providedIn: 'root'
})
export class CruisingSalaryService {
  _baseUrl = environment.novApiUrl;
  _url = this._baseUrl + 'api/cruisingsalary';
  constructor(private http: HttpClient) {}

  getByFilters(
    filtersData: ICruisingSalaryManagerFilter,
    pageNumber: number
  ): Observable<CruisingSalaryListModel> {
    const url = this._url + '/getbyfilters';

    return this.http.post<CruisingSalaryListModel>(url, {
      filters: filtersData,
      pageNumber: pageNumber
    });
  }

  getInitialize() {
    const url = this._url + '/initialize';

    return this.http.post<any>(url, null);
  }

  approve(item: IDialogNovely): Observable<any> {
    const url = this._url + '/approve';

    return this.http.post<any>(url, item);
  }

  observe(item: IDialogNovely): Observable<any> {
    const url = this._url + '/observe';

    return this.http.post<any>(url, item);
  }

  bulkApproval(item: number[]): Observable<any> {
    const url = this._url + '/bulkApproval';

    return this.http.post<any>(url, item);
  }

  public update(item: ISalaryDistributionBindingModel): Observable<any> {
    return this.http.put(this._url, item);
  }

  getStatusNotApprovedOrSend(): Observable<number> {
    const url = this._url + '/';

    return this.http.get<number>(url);
  }

  GetTotalByFilters(filtersData: ICruisingSalaryManagerFilter): Observable<number> {
    const url = this._url + '/getTotalByFilters';

    return this.http.post<number>(url, filtersData);
  }

  ApproveByFilters(filtersData: ICruisingSalaryManagerFilter): Observable<any> {
    const url = this._url + '/approveByFilters';

    return this.http.post<any>(url, filtersData);
  }

  DisapproveByFilters(filtersData: ICruisingSalaryManagerFilter): Observable<any> {
    const url = this._url + '/disapproveByFilters';

    return this.http.post<any>(url, filtersData);
  }
}
