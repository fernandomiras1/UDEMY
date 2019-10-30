import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef, EmbeddedViewRef,
  Inject, Injector, OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { IModalDialogOptions } from '../../utils/services/modal/models/modal-dialog.interface';
import { ZBrowser } from '../../utils/util/browser/browser';
import { NGZModalDialogService } from '../../utils/services/modal/modal-dialog.service';
import { ICustomDialogOptions } from './services/custom-dialog.service';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { map, pairwise, filter } from 'rxjs/operators';
import { DocumentService } from '../../utils/services/document/document.service';
import { WindowService } from '../../utils/services/window/window.service';

@Component({
  selector: 'z-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss']
})
export class NGZCustomDialogComponent implements OnInit, OnDestroy, IModalDialogOptions<any>, AfterViewInit {
  isPostbackSafari = false;
  browser = new ZBrowser(this.windowService);
  isMobile = false;
  styleArray = { 'max-height': '494px', 'min-height': '494px', 'min-width': '480px', position: 'absolute' };
  styleArrayMobile = { 'max-height': '494px', 'min-height': '494px', 'min-width': '296px', position: 'absolute' };
  maxWidthCard = '480px';
  marginCardMobile = '0 32px';
  titleDialog: string;
  scrollBody;
  marginTopTitle = 40;
  heightTitle = 80;
  isLineFinish = false;
  disabledClose = false;
  suscriptionScroll: Subscription;
  childComponent: any;
  data: any;
  placeOnTop: boolean;
  outputData: Subject<any>;
  onAfterClose: Subject<any>;
  isOverlay: boolean;
  eventBody: any;
  keypressSubscription: Subscription;

  constructor(private documentService: DocumentService,
              private viewContainerRef: ViewContainerRef,
              private injector: Injector,
              private windowService: WindowService,
              private deviceDetector: DeviceDetectorService,
              @Inject(ComponentFactoryResolver) private componentFactoryResolver: ComponentFactoryResolver,
              private modalService: NGZModalDialogService) {
    this.isMobile = this.deviceDetector.isMobile();
  }

  ngOnInit() {
    this.dialogInit();
    if (this.isMobile) {
      this.maxWidthCard = '296px';
    }
  }

  ngAfterViewInit() {
    this.setModal();
  }

  ngOnDestroy(): void {
    if (this.suscriptionScroll) {
      this.suscriptionScroll.unsubscribe();
    }
    if (this.keypressSubscription) {
      this.keypressSubscription.unsubscribe();
    }
  }

  setModal(): void {
    const browser = new ZBrowser(this.windowService);
    this.documentService.nativeDocument.body.style.overflow = 'hidden';
    (this.documentService.nativeDocument.querySelector('z-custom-dialog') as HTMLElement).style.alignItems = 'center';
    (this.documentService.nativeDocument.querySelector('z-custom-dialog') as HTMLElement).style.border = '0';
    (this.documentService.nativeDocument.querySelector('z-custom-dialog') as HTMLElement).style.display = 'flex';
    (this.documentService.nativeDocument.querySelector('z-custom-dialog') as HTMLElement).style.height = 'calc(100vh - 10px)';
    (this.documentService.nativeDocument.querySelector('z-custom-dialog') as HTMLElement).style.justifyContent = 'center';
    (this.documentService.nativeDocument.querySelector('z-custom-dialog') as HTMLElement).style.left =
      browser.getBrowser() === 'ie' ? '-10%' : '0';
    (this.documentService.nativeDocument.querySelector('z-custom-dialog') as HTMLElement).style.overflow = 'hidden';
    (this.documentService.nativeDocument.querySelector('z-custom-dialog') as HTMLElement).style.position = 'fixed';
    (this.documentService.nativeDocument.querySelector('z-custom-dialog') as HTMLElement).style.right = '0';
    (this.documentService.nativeDocument.querySelector('z-custom-dialog') as HTMLElement).style.top =
      browser.getBrowser() === 'ie' ? '-10%' : '0';
    (this.documentService.nativeDocument.querySelector('z-custom-dialog') as HTMLElement).style.width = '100%';
    (this.documentService.nativeDocument.querySelector('z-custom-dialog') as HTMLElement).style.zIndex = '830';

    const bodyElement = (this.documentService.nativeDocument.querySelector('body') as HTMLElement);
    this.eventBody = fromEvent(bodyElement, 'keydown');
    this.suscribekeyPress();
  }

  suscribekeyPress(): void {
    this.keypressSubscription = this.eventBody.pipe(
      filter((event: KeyboardEvent) => event.key === 'Escape' || event.key === 'Tab' || event.key === 'Enter'))
      .subscribe((event) => {
        if (event.key === 'Escape') {
          this.closeModal();
        } else {
          event.preventDefault();
        }
      });
  }

  clickOutside(): void {
    if (this.browser.getBrowser() === 'safari' && !this.isPostbackSafari) {
      this.isPostbackSafari = true;
      return;
    }

    this.closeModal();
  }

  closeModal(): void {
    this.onAfterClose.next();
    this.modalService.close();
  }

  dialogInit(): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.data.templateComponent);
    const component = this.viewContainerRef.createComponent(factory) as ComponentRef<ICustomDialogOptions>;
    if (this.data.options) {
      component.instance.onActionClose = this.data.options.onActionClose;
      this.disabledClose = this.data.options.disabledClose;
    }

    const domElem = (component.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    (this.documentService.nativeDocument.querySelector('.z-custom-modal-dialog__content__body') as HTMLElement).appendChild(domElem);

    if (this.data.titleDialog) {
      this.titleDialog = this.data.titleDialog;
      const bodyElement = (this.documentService.nativeDocument.querySelector('.z-custom-modal-dialog__content__body')) as HTMLElement;

      this.scrollBody = fromEvent(bodyElement, 'scroll');
      this.suscribeScroll();
    }
  }

  suscribeScroll(): void {
    this.suscriptionScroll = this.scrollBody.pipe(map((value: any) => value.target.scrollTop), pairwise())
      .subscribe((scrollValues) => {
        if (scrollValues[0] < scrollValues[1] && this.marginTopTitle !== 0) {
          this.marginTopTitle -= 4;
          this.heightTitle -= 4;
          this.isLineFinish = false;
        }
        if (scrollValues[0] > scrollValues[1] && this.marginTopTitle !== 40) {
          this.marginTopTitle += 4;
          this.heightTitle += 4;
          this.isLineFinish = false;
        }
        if (this.marginTopTitle === 0) {
          this.isLineFinish = true;
        }
      });
  }
}
