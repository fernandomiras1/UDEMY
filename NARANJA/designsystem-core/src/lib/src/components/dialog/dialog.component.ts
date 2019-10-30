import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { IContainerIconData } from '../container-icon/models/container-icon-data.interface';
import { IModalDialogButton } from './services/dialog.service';
import { IModalDialogOptions } from '../../utils/services/modal/models/modal-dialog.interface';
import { ZBrowser } from '../../utils/util/browser/browser';
import { Subject, fromEvent, Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { WindowService, DocumentService, KeypressService, NGZModalDialogService } from '../../utils/index';

@Component({
  selector: 'z-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class NGZDialogComponent implements OnInit, IModalDialogOptions<any>, AfterViewInit, OnDestroy {
  isPostbackSafari = false;
  browser = new ZBrowser(this.windowService);
  contentIcon: IContainerIconData;
  title: string;
  paragraph: string;
  actionsButtons: IModalDialogButton[] = [];
  onAfterClose: Subject<any>;
  // subjet generico
  onAction: Subject<any>;
  count = 0;
  isMobile = false;
  maxWidthCard = '360px';
  lengthButtons = 0;
  styleArray = { 'min-width': '360px', position: 'absolute' };
  styleArrayMobile = { 'min-width': '296px', position: 'absolute' };
  childComponent?: any;
  data: any;
  placeOnTop: boolean;
  outputData: Subject<any>;
  isOverlay: boolean;
  eventBody: any;
  disabledClose = false;
  keypressSubscription: Subscription;

  constructor(
    private documentService: DocumentService,
    private windowService: WindowService,
    public modalService: NGZModalDialogService,
    private deviceDetector: DeviceDetectorService,
    private keypressService: KeypressService) {
    this.isMobile = this.deviceDetector.isMobile();
  }

  ngOnInit() {
    this.contentIcon = this.data.contentIcon;
    this.title = this.data.title;
    this.paragraph = this.data.paragraph;
    this.actionsButtons = this.data.actionsButtons;
    this.disabledClose = this.data.disabledClose;
    this.onAction = this.data.onAction;
    this.onAfterClose = this.onAfterClose;

    if (this.isMobile) {
      this.maxWidthCard = '296px';
    }

    if (!this.contentIcon) {
      this.styleArray = { 'min-width': '360px', position: 'absolute' };
    }

  }

  ngAfterViewInit() {
    this.setModal();
    this.lengthButtons = this.actionsButtons.length;
  }

  setModal(): void {

    this.documentService.nativeDocument.body.style.overflow = 'hidden';
    (this.documentService.nativeDocument.querySelector('z-dialog') as HTMLElement).style.alignItems = 'center';
    (this.documentService.nativeDocument.querySelector('z-dialog') as HTMLElement).style.border = '0';
    (this.documentService.nativeDocument.querySelector('z-dialog') as HTMLElement).style.display = 'flex';
    (this.documentService.nativeDocument.querySelector('z-dialog') as HTMLElement).style.height = 'calc(100vh - 10px)';
    (this.documentService.nativeDocument.querySelector('z-dialog') as HTMLElement).style.justifyContent = 'center';
    (this.documentService.nativeDocument.querySelector('z-dialog') as HTMLElement).style.left =
      this.browser.getBrowser() === 'ie' ? '-10%' : '0';
    (this.documentService.nativeDocument.querySelector('z-dialog') as HTMLElement).style.overflow = 'hidden';
    (this.documentService.nativeDocument.querySelector('z-dialog') as HTMLElement).style.position = 'fixed';
    (this.documentService.nativeDocument.querySelector('z-dialog') as HTMLElement).style.right = '0';
    (this.documentService.nativeDocument.querySelector('z-dialog') as HTMLElement).style.top =
      this.browser.getBrowser() === 'ie' ? '-10%' : '0';
    (this.documentService.nativeDocument.querySelector('z-dialog') as HTMLElement).style.width = '100%';
    (this.documentService.nativeDocument.querySelector('z-dialog') as HTMLElement).style.zIndex = '810';

    this.keyboardEvents();
  }

  clickOutside(): void {
    if (this.browser.getBrowser() === 'safari' && !this.isPostbackSafari) {
      this.isPostbackSafari = true;
      return;
    }

    this.closeModal();
    if (this.onAfterClose) {
      this.onAfterClose.next();
    }

  }

  eventAction(actionButtonAux: IModalDialogButton): void {
    this.closeModal();
    if (this.onAction) {
      this.onAction.next(actionButtonAux);
    }
    if (actionButtonAux.onAction) {
      actionButtonAux.onAction.next();
    }
  }

  closeModal(): void {
    this.modalService.close();
  }

  ngOnDestroy(): void {
    if (this.keypressSubscription) {
      this.keypressSubscription.unsubscribe();
    }
  }

  keyboardEvents() {
    this.keypressService.keyPressEscape().subscribe((response) => {
      if (response) {
        this.closeModal();
      }
    });

    this.keypressService.keyPressTab().subscribe((response) => {
      if (response) {
        event.preventDefault();
      }
    });

    this.keypressService.keyPressEnter().subscribe((response) => {
      if (response) {
        event.preventDefault();
      }
    });
  }
}
