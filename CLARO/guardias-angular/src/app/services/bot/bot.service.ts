import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private http:HttpClient) { }

  chat(userId:string, message:string){

    const url = `http://intraoperativa.claro.amx/intranet/calidad/telegram_app/consultar_servicio_bot_curl.php`;

    return fetch(url, {
      method: 'POST', // or 'PUT'
      body: `consulta=${message}&idusuario=${userId}&fuente=intranet`,
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => response.text())
  }




}
