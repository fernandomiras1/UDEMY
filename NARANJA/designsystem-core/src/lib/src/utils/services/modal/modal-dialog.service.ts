import {
  ComponentFactoryResolver,
  Inject,
  ApplicationRef,
  EmbeddedViewRef,
  ComponentRef,
  Injector,
  Type
} from '@angular/core';
import { ModalDialogOptions } from './models/modal-dialog.interface';
import { NGZModalDialogInstanceService } from './modal-dialog-instance.service';
import { DialogInjector } from './models/dialog-inject.model';
import { DocumentService } from '../document/document.service';

export class NGZModalDialogService {
  dialogComponentRef: ComponentRef<any>;
  overlayDiv: any;
  isOverlay: boolean;
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private documentService: DocumentService,
    @Inject(ComponentFactoryResolver) private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(NGZModalDialogInstanceService) private modalDialogInstanceService: NGZModalDialogInstanceService) {
  }

  openDialog(componentType: Type<any>, options: ModalDialogOptions) {
    if (!options.placeOnTop) {
      this.modalDialogInstanceService.closeAnyExistingModalDialog();
    }

    const map = new WeakMap();
    map.set(ModalDialogOptions, options);

    const factory = this.componentFactoryResolver.resolveComponentFactory(options.childComponent);
    const componentRef = factory.create(new DialogInjector(this.injector, map));
    this.dialogComponentRef = componentRef;
    this.appRef.attachView(this.dialogComponentRef.hostView);
    this.isOverlay = options.isOverlay;

    if (options.isOverlay) {
      this.overlayDiv = this.documentService.nativeDocument.createElement('div');
      this.overlayDiv.style.position = 'fixed';
      this.overlayDiv.style.background = 'rgb(51, 51, 51)';
      this.overlayDiv.style.opacity = ' 0.9';
      this.overlayDiv.style.overflow = 'hidden';
      this.overlayDiv.style.top = '0';
      this.overlayDiv.style.left = '0';
      this.overlayDiv.style.right = '0';
      this.overlayDiv.style.bottom = '0';
      this.overlayDiv.style.width = '100%';
      this.overlayDiv.style.zIndex = '800';
      this.overlayDiv.style.height = this.documentService.nativeDocument.body.style.height;
      this.documentService.nativeDocument.body.appendChild(this.overlayDiv);
    }

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.documentService.nativeDocument.body.appendChild(domElem);
    Object.assign(this.dialogComponentRef.instance, options);
    this.modalDialogInstanceService.saveExistingModalDialog(componentRef);
  }

  public close(): void {
    if (this.dialogComponentRef) {
      if (this.isOverlay) {
        this.documentService.nativeDocument.body.removeChild(this.overlayDiv);
      }
      this.appRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.destroy();
      this.documentService.nativeDocument.body.style.overflow = 'inherit';
    }
  }
}
