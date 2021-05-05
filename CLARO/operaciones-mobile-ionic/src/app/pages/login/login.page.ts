import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { NgForm } from '@angular/forms';
import { MenuController, LoadingController } from '@ionic/angular';
import { MessageService } from '@services/message.service';
import { AuthService } from '@services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: any;
  hidePassword = true;
 
  constructor(private router: Router,
              private messageService: MessageService,
              public loadingCtrl: LoadingController,
              private authService: AuthService,
              public menuCtrl: MenuController) { }

  ngOnInit() {

   
  }
  
  ionViewWillEnter() {
    this.authService.removeUser();
    this.menuCtrl.enable(false);
  }


  login(form: NgForm){

    // this.authService.getTokenAPI().subscribe(resu => {
    //   console.log('getTokenAPI', resu);
    // })
    // this.authService.login(form.value).subscribe(resu => {
    //   console.log('API -  Externa', resu);
    // })
    if (form.valid) {
      this.presentLoading('Espere...');
      console.log(form.value);
      // Simulamos el tiempo de una API
    setTimeout(() => {
      // Cancelamos el Loading
      this.loading.dismiss()
      this.router.navigateByUrl('home');
    }, 1000);

      // this.authService.login(form.value).subscribe((res)=>{
      //   console.log('res', res);
      //   this.router.navigateByUrl('home');
      // });
    } else {
      this.messageService.presentToast('Por favor, ingrese todos los campos');
    }
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message
    });
    return this.loading.present();
  }

}
