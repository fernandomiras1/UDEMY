import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  loading: any;
  constructor(public loadingCtrl: LoadingController) {}


  ngOnInit() {
    this.presentLoading('Espere...');
    
    // Simulamos el tiempo de una API
    setTimeout(() => {
      // Cancelamos el Loading
      this.loading.dismiss()
    }, 1500);
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message,
      // duration: 2000
    });
    return this.loading.present();
  }

}
