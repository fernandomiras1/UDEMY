import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LoggerService{
  prefix =  'root';
  log(msg: any)   { console.log(this.prefix + ': ' + msg); }
    error(msg: any) { console.error(msg); }
    warn(msg: any)  { console.warn(msg); }
}