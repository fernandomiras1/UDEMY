import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }


  configInicial() {

    // obtenemos el Id y key de la pagina oneSignal https://app.onesignal.com/apps/dad387d3-64e6-4b03-83d9-5ac1d5e0e4bf/settings/keys_and_ids
    // segundo agrumento 9024487.. viene de firebase https://console.firebase.google.com/project/ingreso-egreso-app-8dec0/settings/cloudmessaging
    // vinculamos la firebase con oneSignal.
    this.oneSignal.startInit('dad387d3-64e6-4b03-83d9-5ac1d5e0e4bf', '902448700150');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      // do something when notification is received
      console.log('Notificacion recibida', noti);
    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log('Notificacion abierta', noti);
    });

    this.oneSignal.endInit();

  }
}
