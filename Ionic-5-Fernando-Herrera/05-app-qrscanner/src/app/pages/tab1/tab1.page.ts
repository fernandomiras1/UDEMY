import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  slidesOptions = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  constructor(private barcodeScanner: BarcodeScanner) {}
  // cilcos de vida de ionic
  // https://ionicframework.com/docs/v3/api/navigation/NavController/#viewDidEnter
  ngOnInit() {
    console.log('ngOnInit');
  }

  // es como el ngOnInit. cada vez que se inicialice el componente
  ionViewDidEnter(){
   console.log('ionViewDidEnter');
  }

  scan() {

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  // cuando salis del componente
  ionViewDidLeave(){
   console.log('ionViewDidLeave');
  }

}
