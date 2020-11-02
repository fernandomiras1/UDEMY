import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';

const serviceEndpoints = (function(){
  const api = 'http://intraoperativa.claro.amx/intranet'
  return {
      getTopicos: api + '/calidad/calidad1/api/gettopicos?aplicacion=',
      postTopicos: api + '/calidad/calidad1/api/creartopico',
      postNotificaciones: api + '/calidad/calidad1/api/solicitudaviso'
  }
})()

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  app:string;
  endpoints:any;

  constructor(private http: HttpClient) { 
    this.app       = 'WEB DE GUARDIA'
    this.endpoints = serviceEndpoints
  }

  send({idususol,idusurecep,mensaje}){

    const notificationData = {
        aplicacion:this.app,
        idususol,
        legajosol:'',
        topico:'CAMBIO_RESPONSABLE_GRUPO_GUARDIA',
        mensaje:mensaje,
        idusurecep,
        legajorecep:'',
        perfil:'',
        grupo:'',
        gruporemedy:''
    };
    
    let headers = new HttpHeaders();
    let url = this.endpoints.postNotificaciones;

    if(environment.sendNotification){
      return this.http.post(url,notificationData,{headers});
    }
    else{
      //simulacion de envio de notificacion
      return this.http.post('https://jsonplaceholder.typicode.com/posts',{});
    }
  }

  batch(messages:MessageInterface[]): Observable<any> {

    let observables = [];

    messages.forEach(message => {
      observables.push(this.send(message));
    });

    return forkJoin(observables);
    
  }

}

interface NotificationsInterface {
  aplicacion:string,
  idususol:string,
  legajosol?:string,
  topico:string,
  mensaje:string,
  idusurecep:string,
  legajorecep?:string,
  perfil?:string,
  grupo?:string,
  gruporemedy?:string
}

export interface MessageInterface {
  idususol:string,
  idusurecep:string,
  mensaje:string,
}