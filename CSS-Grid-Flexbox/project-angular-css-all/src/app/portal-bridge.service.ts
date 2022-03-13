import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TemplatePortal, ComponentPortal, DomPortal } from '@angular/cdk/portal';

type Portal = TemplatePortal | ComponentPortal<any> | DomPortal

@Injectable({
  providedIn: 'root'
})
export class PortalBridgeService {

  private activePortal = new Subject<Portal>();

  readonly portal$ = this.activePortal.asObservable();

  constructor() { }

  setPortal(portal: Portal) {
    this.activePortal.next(portal)
  }

}
