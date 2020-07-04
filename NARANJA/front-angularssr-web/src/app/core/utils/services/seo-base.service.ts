import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { NavigatorService } from './navigator.service';

@Injectable({
  providedIn: 'root',
})
export class SeoBaseService {
  private titleSubject: Subject<string> = new Subject();
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _title: Title,
    private _meta: Meta,
    private _navigatorSvc: NavigatorService,
    @Inject(DOCUMENT) private document,
    @Optional() @Inject('serverUrl') protected serverUrl: string,
  ) {}

  init () {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      mapTo(this._activatedRoute),
      switchMap(route => route.firstChild.data),
      map(data => ({
        data,
        url: this._activatedRoute.firstChild.snapshot['_routerState'].url,
      })),
    ).subscribe((base) => {
      const canonical = base.data.canonicalUrl ? base.data.canonicalUrl : base.url;
      const serverURL = this._navigatorSvc.isServer ? this.serverUrl : `${window.location.protocol}//${window.location.host}`;

      this.titleSubject.next(base.data.title);
      // set title
      if (base.data.title) {
        this._title.setTitle(base.data.title);
      }
      // set description
      if (base.data.description) {
        this._meta.addTag({ name: 'description', content: base.data.description });
      }

      // set robots
      if (base.data.robots) {
        this._meta.addTag({ name: 'robots', content: base.data.robots });
      }

      // set canonical
      this.createCanonicalURL(`${environment.seo.canonicalDomain}${canonical}`);

      // set open graph (fb)
      this._meta.updateTag({ property: 'og:title', content: base.data.title });
      this._meta.updateTag({ property: 'og:description', content: base.data.description });
      this._meta.updateTag({
        property: 'og:image',
        content: `${serverURL}/assets/images/opengraph/social-share.png`,
        itemprop: 'image',
      });
      this._meta.updateTag({
        property: 'og:image:url',
        content: `${serverURL}/assets/images/opengraph/social-share.png`,
        itemprop: 'image',
      });
      this._meta.updateTag({ property: 'og:image:type', content: 'image/png' });
      this._meta.updateTag({
        property: 'og:url',
        content: `${serverURL}`,
      });
      this._meta.updateTag({ property: 'og:type', content: 'website' });
    });

  }
  /**
   * Set canonical URL
   * Link: https://www.talkingdotnet.com/how-to-set-canonical-url-in-angular-7/
   */
  createCanonicalURL(path = null) {
    const url = path ? path : this.document.URL;
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.document.head.appendChild(link);
    link.setAttribute('href', url);
  }
}
