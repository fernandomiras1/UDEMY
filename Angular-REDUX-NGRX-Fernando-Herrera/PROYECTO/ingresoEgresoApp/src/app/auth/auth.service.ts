import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from './user.model';

// No hace falta declararlo en mi app.moduletsts porque esta injectado de esta forma
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth, 
              private router: Router,
              private afDB: AngularFirestore ) { }

  // con FireBase podemos obtener la info del usuario que se encuentra logeado en ese momento. 
  // Si es null es porque no esta logeado
  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string): void {

    this.afAuth.auth
      .createUserWithEmailAndPassword( email, password).then( resu => {
          console.log('resu', resu);

          const user: User = {
            nombre: nombre,
            uid: resu.user.uid,
            email: resu.user.email
          }
          // Creo el Documento en FireBase
          // el user.id es lo que va a mostrar el la collecion
          // el nombre: usuario es lo que va a guardar en la colleccion. 
          this.afDB.doc(`${ user.uid }/usuario`)
            .set( user )
            // Si todo lo hace correctamente, navego al dasboard
            .then( ()=> {
              this.router.navigate(['/']);
            });

      })
      .catch( error => { 
        console.error(error);
      });
  }

  login( email: string, password: string): void {

    this.afAuth.auth.signInWithEmailAndPassword( email, password)
      .then( resu => {
        console.log(resu);
        this.router.navigate(['/']);
      })
      .catch( error => { 
        console.error(error);
      });
  }

  // cerrar session
  logout() {
    this.router.navigate( ['/login'] );
    this.afAuth.auth.signOut();
  }


  // Verficamos si esta logeado
  // este metodo devuelve un observable
  isAuth() {
   return this.afAuth.authState.pipe(
     map( fbUser => {
       
      if ( fbUser == null ) {
        this.router.navigate(['/login']);
      }

      return fbUser != null
     })
     );
   
  }

}
