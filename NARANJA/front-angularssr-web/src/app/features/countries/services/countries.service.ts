import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get<any>(environment.addresses.countries);
  }
}
