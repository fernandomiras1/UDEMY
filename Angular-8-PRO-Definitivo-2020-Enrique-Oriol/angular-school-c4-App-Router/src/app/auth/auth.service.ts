import { Injectable } from '@angular/core';
import {of, Observable} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

interface User{
  name:string;
  email:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user:User = null;

  constructor() { }

  login():Observable<User>{
    return of({name:"Peter", email:"peter@gmail.com"}).pipe(
      delay(750),
      tap(user => this.user = user)
    );
  }

  logout(){
    this.user = null;
  }
}
