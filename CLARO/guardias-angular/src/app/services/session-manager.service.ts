import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  private static storage:any = sessionStorage;

  static getItem(key:string):string {
    return this.storage.getItem(key);
  }

  static setItem(key:string,value:string):void {
    this.storage.setItem(key,value);
  }
  
  static removeItem(key:string):void {
    this.storage.removeItem(key);
  }

  static user() {
    return JSON.parse(this.getItem('userClaro'))
  }

}
