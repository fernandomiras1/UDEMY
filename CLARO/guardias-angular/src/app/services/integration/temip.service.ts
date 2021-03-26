import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { ResponseTemip } from '@app/models/temip.model';

@Injectable({
  providedIn: 'root'
})

export class TemipService {

  private apiUrl = environment.URL + '/api';
  private headers = new HttpHeaders({
    'Content-Type': `application/json`
  });
  
  constructor(private http: HttpClient) { }

  getInfoByType(type: string, name: string) {
    return this.http.get<ResponseTemip>(`${this.apiUrl}/integration?type=${type}&name=${name}`, { headers: this.headers });
  }

}
