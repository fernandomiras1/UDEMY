import { WindowService } from '../../services/window/window.service';

export class ZBrowser {
  constructor(
    private windowService: WindowService
  ) {}

  public getBrowser() {
    const agent = this.windowService.nativeWindow.navigator.userAgent.toLowerCase();
    switch (true) { // https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
      case agent.indexOf('edge') > -1: return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr: return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome: return 'chrome';
      case agent.indexOf('trident') > -1: return 'ie';
      case agent.indexOf('firefox') > -1: return 'firefox';
      case agent.indexOf('safari') > -1: return 'safari';
      default: return 'none';
    }
  }
}
