import {
  Component, OnInit, OnDestroy,
  ViewChild, ViewContainerRef,
  ComponentFactoryResolver, ComponentRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// service load items
import { AngularLoadListService } from '../../services/load-list.service';

@Component({
  selector: 'dsn-unknown-component',
  template: `<div>Unknown component</div>`
})
export class UnknownDynamicComponent {}

@Component({
  selector: 'dsn-load-elements',
  templateUrl: './angular.component.html'
})
export class AngularPageComponent implements OnInit, OnDestroy {

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;
  componentId: string;

  constructor(
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private loadList: AngularLoadListService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.componentId = params.id;

      this.loadComponent();
    });
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  loadComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    // NOTE: componentType must be declared in module.entryComponents
    const componentType = this.getComponentClass(this.componentId);
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    this.componentRef = this.container.createComponent(factory);
  }

  getComponentClass(id: string) {
    const component = this.loadList.getComponentByID(id);

    return (component) ? component.componentClass : UnknownDynamicComponent;
  }
}
