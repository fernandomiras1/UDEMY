import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  imgShowPass = {
    toggle: false,
    path: '../../assets/imgs/',
    url:'outline_eye_off',
    type: 'password',
  };
  user = {
    legajo: '',
    password: '',
  }
  showError = {
    legajo: false,
    password: false,
  }
  isLogin: boolean = false;
  constructor(private loginservice: LoginService,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  login() {
    this.showError.legajo = this.user.legajo.length < 1 ? true : false;
    this.showError.password = this.user.password.length < 1 ? true : false;
    if(!this.showError.legajo && !this.showError.password) {
      this.isLogin = true;
      this.loginservice.auth(this.user.legajo, this.user.password).subscribe(resp => {
        this.isLogin = false;
        if(resp) {
          this.loginservice.setDataLogin(resp);
        }
      }, e => {
        if(e.status === 401) {
          this.errorLogin('Las credenciales provistas no son válidas.');
        } else if(e.status === 500) {
          this.errorLogin('¡Error de conexión!', 'Ok');
        } else {
          this.errorLogin('Ocurrió un error. Por favor, intente nuevamente o contacte al equipo de Soporte (soportedeherramientas@claro.com.ar)', 'Ok');
        }
        this.loginservice.clearClaroStorage();
        this.isLogin = false;
      });
    }
  }
  showPass() {
    this.imgShowPass.url = this.imgShowPass.toggle ? 'outline_eye_off' : 'outline_eye';
    this.imgShowPass.type = this.imgShowPass.toggle ? 'password' : 'text';
    this.imgShowPass.toggle = !this.imgShowPass.toggle;
  }
  errorLogin(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
      panelClass: ['bg-color-claro', 'txt-white']
    });
  }
}
