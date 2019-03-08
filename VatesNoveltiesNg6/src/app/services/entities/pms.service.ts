import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { DtoPms } from '../../models/entities/DtoPms';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class PmsService {

  _baseUrl = environment.apiUrl;
  _url = this._baseUrl + 'api/pms';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // get(id: number) {
  //   return this.http
  //   .get(this._url + `/{id}`)
  //   .map(res => {
  //     // return { ok: res.ok, code: res.status, message: res.json() }; // for Http object
  //     return { res }; // for HttpClient object
  //   }).catch(err => {
  //     return Observable.throw({ ok: false, code: err.status, message: err.json() });
  //   });
  // }

  getPms(): Observable<DtoPms[]> {
     return this.http.get<DtoPms[]>(this._url);
      // .map(response => <Pms[]>response)
      // .catch(this.handleError);
  }


}
