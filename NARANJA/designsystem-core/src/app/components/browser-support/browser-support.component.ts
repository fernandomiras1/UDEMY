import { Component, Input } from '@angular/core';

@Component({
  selector: 'dsn-browser-support',
  templateUrl: './browser-support.component.html',
  styleUrls: ['./browser-support.component.scss']
})
export class BrowserSupportComponent {
  @Input()  versionNumber: any [];
  @Input()  visualSupport: any [];
  @Input()  functionalSupport: any [];

  imgpath = './../../../assets/images/';
  browserName = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Internet Explorer', 'Opera', 'Android Webview', 'Samsung Internet'];
  browsers = [
    { name: 'Chrome', image: `${this.imgpath}chrome.png` },
    { name: 'Firefox', image: `${this.imgpath}firefox.png` },
    { name: 'Safari', image: `${this.imgpath}safari.png` },
    { name: 'Edge', image: `${this.imgpath}edge.png` },
    { name: 'Internet Explorer', image: `${this.imgpath}internet_explorer.png` },
    { name: 'Opera', image: `${this.imgpath}opera.png` },
    { name: 'Android Webview', image: `${this.imgpath}android.png` },
    { name: 'Samsung', image: `${this.imgpath}samsung.png` }
  ];
}
