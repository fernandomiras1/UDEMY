import { Injectable, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Subscription, fromEvent, Observable, Subject } from 'rxjs';
import { DocumentService } from '../document/document.service';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class KeypressService implements OnDestroy {

  private keypressSubscription: Subscription;

  constructor(
    private documentService: DocumentService,
    @Inject(PLATFORM_ID) private platformId: any) {
  }

  public suscribeKeyPress(name: string): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const subject = new Subject<boolean>();
      this.keypressSubscription = fromEvent(
        (this.documentService.nativeDocument.querySelector('body') as HTMLElement), 'keydown').pipe(
        filter((event: KeyboardEvent) => event.key === name))
        .subscribe((event) => {
          if (event.key === name) {
            subject.next(true);
          }
        });
      return subject.asObservable();
    }
  }

  public keyPressEscape(): Observable<boolean> {
    return this.suscribeKeyPress('Escape');
  }

  public keyPressTab(): Observable<boolean> {
    return this.suscribeKeyPress('Tab');
  }

  public keyPressEnter(): Observable<boolean> {
    return this.suscribeKeyPress('Enter');
  }

  ngOnDestroy(): void {
    if (this.keypressSubscription) {
      this.keypressSubscription.unsubscribe();
    }
  }
}
