import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/interfaces';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private juegos: Game[] = [];

  constructor(private http: HttpClient) { }

  getNominados() {
    if ( this.juegos.length > 0) {
      // no tenemos juegos
      console.log('Desde Memoria');
      return of(this.juegos);
    } else {
      console.log('Desde Internet');
      return this.http.get<Game[]>(`${ environment.url }/api/goty`).pipe(
        tap(juegos => this.juegos = juegos) //almaceno los juegos en la variable juegos
      );
    }
  }

  votarJuego(id: string) {
    return this.http.post(`${ environment.url }/api/goty/${id}`, null).pipe(
      catchError(err => {
        return of(err.error);
      })
    )
  }
}
