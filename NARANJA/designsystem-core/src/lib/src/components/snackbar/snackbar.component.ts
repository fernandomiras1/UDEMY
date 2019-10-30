import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import { NGZModalDialogService } from '../../utils/services/modal/modal-dialog.service';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import 'hammerjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DocumentService } from '../../utils/services/document/document.service';
import { WindowService } from '../../utils/services/window/window.service';
import { IModalDialogOptions } from '../../utils/services/modal/models/modal-dialog.interface';

@Component({
  selector: 'z-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NGZSnackbarComponent implements AfterViewInit, OnDestroy, OnInit, IModalDialogOptions<any> {
  childComponent?: any;
  placeOnTop?: boolean;
  outputData?: Subject<any>;
  isOverlay?: boolean;
  text: string;
  eventName: string;
  isHiddenButton: boolean;
  duration = 3;
  hasDuration = true;
  posX: string;
  isTablet = false;
  isMobile: boolean;
  onAfterClose: Subject<any> = new Subject<any>();
  subscriptionDuration: Subscription;
  durationObservable$: Observable<any>;
  isTwoLines = false;
  data: any;
  @ViewChild('textSnackbar') textSnackbar: ElementRef;

  constructor(
    public modalService: NGZModalDialogService,
    private deviceDetecter: DeviceDetectorService,
    private documentService: DocumentService,
    private windowService: WindowService,
    private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.text = this.data.text;
    this.eventName = this.data.eventName;
    if (this.data.isHiddenButton !== undefined) {
      this.isHiddenButton = this.data.isHiddenButton;
    }
    this.duration = this.data.duration;
    if (this.data.hasDuration !== undefined) {
      this.hasDuration = this.data.hasDuration;
    }

    this.isMobile = this.deviceDetecter.isMobile();
    this.isHiddenButton = this.isMobile;

    if (this.isMobile && this.documentService.nativeDocument.body.offsetWidth > 767) {
      this.isTablet = true;
      this.isHiddenButton = false;
      this.isTwoLines = false;
    }

  }

  ngAfterViewInit() {
    if (this.hasDuration) {
      this.durationObservable$ = timer(this.duration * 1000);

      this.subscriptionDuration = this.durationObservable$.subscribe(() => {
        this.modalService.close();
      });
    }
    const styles = this.windowService.nativeWindow.getComputedStyle(this.textSnackbar.nativeElement);

    if (styles && this.westernArabicNumeralsOnly(styles.height) >= 36) {
      this.isTwoLines = true;
    }
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subscriptionDuration) {
      this.subscriptionDuration.unsubscribe();
    }
  }

  onPan(event: any): void {
    this.posX = `${event.deltaX}px`;
  }

  onPanStop(): void {
    const pos = this.westernArabicNumeralsOnly(this.posX);
    if (pos > 120 || pos < -120) {
      this.onAfterClose.next('closeSnackbarSpanStop');
      this.modalService.close();
    } else {
      this.posX = '8px';
    }
  }

  westernArabicNumeralsOnly(style: string): number {
    return style !== null ? style.match(/\d+/g).map(Number)[0] : null;
  }

  eventButton() {
    this.modalService.close();
    if (this.onAfterClose) {
      this.onAfterClose.next(this.eventName);
    }
  }

  closeSnackbar() {
    this.modalService.close();
    this.onAfterClose.next('closeSnackbar');
  }
}
