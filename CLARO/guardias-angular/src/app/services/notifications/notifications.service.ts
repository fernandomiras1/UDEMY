import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
interface NotificationsInterface {
  aplicacion:string;
  idususol:string;
  legajosol?:string;
  topico:string;
  mensaje:string;
  idusurecep:string;
  legajorecep?:string;
  perfil?:string;
  grupo?:string;
  gruporemedy?:string;
  email?:string;
}

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

  send({idususol = '',idusurecep = '', mensaje = '', email = ''}): Observable<any>{

    const notificationData: NotificationsInterface = {
        aplicacion:this.app,
        idususol,
        legajosol:'',
        topico:'NOTIFICACION_CALIDAD_NOC',
        mensaje,
        idusurecep,
        legajorecep:'',
        perfil:'',
        grupo:'',
        gruporemedy:'',
        email: email
    };
    
    // En ambientes no productivos las notificaciones se envian a la lista de distribucion de QA
    if(!environment.production){
      notificationData.email = environment.emailDev;
    }
    
    return this.sendNotification(notificationData);
  }

  sendNotification(notificationData: NotificationsInterface) {
    const headers = new HttpHeaders();
    const url = this.endpoints.postNotificaciones;

    return this.http.post(url,notificationData,{headers});
  }

  batch(messages:MessageInterface[]): Observable<any> {

    let observables = [];

    messages.forEach(message => {
      observables.push(this.send(message));
    });

    return forkJoin(observables);
    
  }

}


export interface MessageInterface {
  idususol:string,
  idusurecep:string,
  mensaje:string,
}