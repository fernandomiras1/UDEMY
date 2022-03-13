import { ApplicationRef, Component, ComponentFactoryResolver, Inject, Injector, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PortalBridgeService } from '../portal-bridge.service';
import { CdkPortal, ComponentPortal, DomPortal, DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { ActionsButtonsComponent } from '../actions-buttons/actions-buttons.component';
import { DOCUMENT } from '@angular/common';

export interface User {
  name: string;
  lastName: string;
  profession: string;
}


const USER_DATA: User[] = [
  {name: 'Dmytro', lastName: 'Mezhenskyi', profession: 'Frontend Developer'},
  {name: 'Daria', lastName: 'Lazurenko', profession: 'UI Designer'},
];


@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {

  // Forma a mano digamos con un ng-temaple #portal. Podemos mejorar esto con la directica de anuglar cdkPortal
  // @ViewChild('portalContent', { static: true}) portalContent: TemplateRef<unknown>

  @ViewChild(CdkPortal, {static: true}) portalContent: CdkPortal

  displayedColumns: string[] = ['name', 'lastName', 'profession'];
  dataSource = USER_DATA;

  // Portal con Componente
  componentPortal: ComponentPortal<ActionsButtonsComponent>;

  portalHost: DomPortalOutlet

  // Portal con DOM ( no se para que caso se usaria)
  domPortal: DomPortal;

  constructor(private portalBridge: PortalBridgeService,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    // creamos el portal con el template donde va a tener el cotenido que se emitira.

    // Fomra vieja con el ng-template
    // const portal = new TemplatePortal(this.portalContent, this.viewContainerRef)
    // this.portalBridge.setPortal(this.portalContent)
    
    // creamos una intancia del componente.
    this.componentPortal = new ComponentPortal(ActionsButtonsComponent);
    // this.portalBridge.setPortal(this.componentPortal)
    
    this.domPortal = new DomPortal(this.document.getElementById('dom-portal'))
    // this.portalBridge.setPortal(this.domPortal)

    this.portalHost = new DomPortalOutlet(
      this.document.getElementById('actions'),
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    )
    // le decimos que queremos que este dentro de la seccion
    this.portalHost.attach(this.portalContent)



  }

  ngOnDestroy() {
    // solo se va a ver en esta pagina el btn
    // this.portalContent.detach();
    
    this.portalHost.detach()
  }

}
