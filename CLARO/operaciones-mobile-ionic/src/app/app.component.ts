import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { MenuController } from '@ionic/angular';
import { MENU } from '@utils/static.data';
import { PushService } from './services/push.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  public nameUser = 'Fernando Miras';
  public numberLegajo = 'c825418';
  public appPages = MENU;

  constructor(
    private platform: Platform,
    public menuCtrl: MenuController,
    private pushService: PushService
  ) {
    this.initializeApp();
    // this.firstWordUppercase('Fernando Miras');
    // this.nameUser = this.firstWordUppercase('Fernando Miras');
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Light });
      this.pushService.initPush();
      if (this.platform.is('android')) {
        StatusBar.setBackgroundColor({ color: '#D62826' });
      }
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }

  clickTest(icon: string) {
    if (icon == 'exit') {
      this.menuCtrl.enable(false);
    }
  }

  // public firstWordUppercase( string: string ) {
  //   let splitString = string.split(' ');
  //   for( let i = 0; i < splitString.length; i++) {
  //     let firstWord = splitString[i].charAt(0).toUpperCase();
  //     splitString[i] = firstWord;
  //   }
  //   console.log(splitString.join(''));
  //   return splitString.join('');
  // }
}
