import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

// No hace falta declararlo en mi app.moduletsts porque esta injectado de esta forma
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth, private router: Router ) { }

  crearUsuario(nombre: string, email: string, password: string): void {

    this.afAuth.auth
      .createUserWithEmailAndPassword( email, password).then( resu => {
          console.log('resu', resu);
          this.router.navigate(['/']);
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


}
