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

  getPaisPorId(id: string) {

    if (this.paises.length > 0 ) {
      // hay paises en el arreglo
      const pais = this.paises.find(p => p.alpha3Code === id);
      return Promise.resolve(pais);
    }

    return this.getPaises().then(paises => {
      const pais = this.paises.find(p => p.alpha3Code === id);
      return Promise.resolve(pais);
    });
  }
}
