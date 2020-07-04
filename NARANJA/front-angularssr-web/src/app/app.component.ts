import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  OnDestroy,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ScriptLoaderService } from './core/utils/services/script-loader.service';
import { environment } from '@environments/environment';
import { SeoBaseService } from './core/utils/services/seo-base.service';
import { isPlatformBrowser } from '@angular/common';
import { SeoGtmService } from './core/utils/services/seo-gtm.service';
import { AuthenticationService } from './core/authentication/services/authentication.service';
import { NavigatorService } from './core/utils/services/navigator.service';
import { CallbackComponent } from './pages/callback/callback.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoggedIn$ = this._authService.isLoggedIn$;
  public isBrowser = this._navigatorService.isBrowser;
  componentFactory;
  loginSubscription: Subscription;

  constructor (
    private translate: TranslateService,
    private router: Router,
    private scriptLoader: ScriptLoaderService,
    private gtmService: SeoGtmService,
    @Inject(PLATFORM_ID) private platformId: any,
    private _seoBase: SeoBaseService,
    private _authService: AuthenticationService,
    private _navigatorService: NavigatorService,
    @Inject(ComponentFactoryResolver) private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {
    this._seoBase.init();
    if (this._navigatorService.isBrowser) {
      this.showSpinner();
    }
  }

  private showSpinner() {
    this.loginSubscription = this._authService.loginInProgress$.subscribe((inProgress) => {
      if (inProgress) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(CallbackComponent).create(this.injector);
        this.appRef.attachView(this.componentFactory.hostView);
        const domElem = (this.componentFactory.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);
      } else if (this.componentFactory) {
        this.appRef.detachView(this.componentFactory.hostView);
        this.componentFactory.destroy();
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadScripts();
    }
  }

  /**
   * Load on demand script for seo.
   */
  loadScripts() {
    this.scriptLoader.load({
      name: 'zepto',
      src: '/assets/js/zepto.js',
      htmlParentElement: 'body',
    }).subscribe(() => {
      this.gtmService.loadGTMById(environment.seo.gtmId);
    });
  }

  onNavigate(url) {
    this.router.navigate([`${url}`]);
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  login() {
    if (this.isBrowser) {
      this._authService.login();
    }
  }

  logout() {
    if (this.isBrowser) {
      this._authService.logout();
    }
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
