import { ComponentPortal, TemplatePortal, DomPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PortalBridgeService } from '../portal-bridge.service';

@Component({
  selector: 'app-action-area',
  templateUrl: './action-area.component.html',
  styleUrls: ['./action-area.component.scss']
})
export class ActionAreaComponent implements OnInit {

  portal$: Observable<TemplatePortal | ComponentPortal<any> | DomPortal>;

  constructor(private portalBridge: PortalBridgeService) { }

  ngOnInit(): void {
    this.portal$ = this.portalBridge.portal$
  }

}
