import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaisInterface } from '../interface/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }

  private paises: PaisInterface[] = [];


  getPaises(): Promise<PaisInterface[]> {

    if (this.paises.length > 0) {
      return Promise.resolve(this.paises);
    }


    return new Promise( resolve => {

      this.http.get('https://restcountries.eu/rest/v2/lang/es')
        .subscribe((paises: PaisInterface[]) => {

          this.paises = paises;
          console.log(paises);
          resolve(paises);
        });
    });

  }
}
