import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { AlertService } from '../../services/alert.service';
import { Usuario } from '../../models/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidesMain') slidesMain: IonSlides;

  loginUser = {
    email: 'fernando.miras.pc@gmail.com',
    password: 'fer12366'
  };

  registerUser: Usuario = {
    email: 'test1@test.com',
    password: '123456',
    nombre: 'Test'
  };

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    // Bloqueamos el Slider principal, ya q lo vamos a manejar con los botones ( login y registro )
    this.slidesMain.lockSwipes(true);
   }

  async login( fLogin: NgForm ) {
    if (fLogin.valid) {
      const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
      if ( valido ) {
        // navegar al tabs
        this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
      } else {
        // mostrar alerta de usuario y contraseña
        this.alertService.presentToast('Usuario y contraseña no son correctos.');
      }
    }
  }

  async registro( fRegistro: NgForm ) {
    console.log('valido', fRegistro.valid);
    if (fRegistro.valid) {
      const valido = await this.usuarioService.registro(this.registerUser);
      if ( valido ) {
        // navegar al tabs
        this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
      } else {
        // mostrar alerta de usuario y contraseña
        this.alertService.presentToast('Ese correo electronio ya existe.');
      }
    }
  }

  mostrarLogin() {
    this.slidesMain.lockSwipes(false);
    this.slidesMain.slideTo(0);
    this.slidesMain.lockSwipes(true);
  }

  mostrarRegistro() {
    this.slidesMain.lockSwipes(false);
    this.slidesMain.slideTo(1);
    this.slidesMain.lockSwipes(true);
  }

}
