import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
  ElementRef, AfterContentInit
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription, fromEvent } from 'rxjs';
import { NGZSelectResultsComponent } from './select-results/select-results.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NGZModalDialogService } from '../../utils/services/modal/modal-dialog.service';
import { WindowService } from '../../utils/services/window/window.service';

@Component({
  selector: 'z-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class NGZSelectComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() placeholderDefault = 'Seleccione una opción';
  @Input() disabled = false;
  @Input() onlyDesktop = false;
  @Input() defaultValue = null;
  @Input() required = true;
  @Input() items = [{ id: 0, text: '', disabled: false }];
  @Input() messagesSuccess: string;
  @Input() messagesHint: string;
  @Input() messagesError: string;
  @Input() submit: Observable<boolean>;
  @Output() itemSelected = new EventEmitter<any>();
  @Output() handlerError = new EventEmitter<any>();
  @Input() item = null;
  @Input() dropUp = true;

  @ViewChild('selectRef') selectRef: ElementRef;

  selectResultsWidth: number;
  iconOpen = false;
  form: FormGroup;
  validationMoment: BehaviorSubject<boolean>;
  errors: any;
  isErrorLine = false;
  inFocus = false;
  isMobileSelect = false;
  outputSubject: Subject<any>;
  outputSubject$: Observable<any>;
  outputSubscription: Subscription;
  resizeSubscription: Subscription;
  onAfterClose: Subject<void>;

  constructor(
    private windowService: WindowService,
    private modalService: NGZModalDialogService,
    private deviceDetectorService: DeviceDetectorService) {
    this.submit = new Observable<boolean>();
    this.validationMoment = new BehaviorSubject<boolean>(null);
  }

  ngAfterContentInit(): void {
    this.widthSelectResults();
    if (!this.isMobileSelect) {
      const eventWindows = fromEvent(this.windowService.nativeWindow.window, 'resize');
      this.resizeSubscription = eventWindows.subscribe(() => this.widthSelectResults());
    }
  }

  ngOnInit(): void {
    this.createForm();
    if (!this.onlyDesktop) {
      this.isMobileSelect = this.deviceDetectorService.isMobile();
    }

    if (this.isMobileSelect) {
      this.outputSubject = new Subject<any>();
      this.onAfterClose = new Subject<void>();

      this.outputSubject$ = this.outputSubject.asObservable();
      this.outputSubscription = this.outputSubject$.subscribe((event) => {
        this.itemSelect(event);
      });
    }

    this.submit.subscribe((result) => {
      if (result) {
        this.validationMoment.next(true);
        this.statusLinesErrorSuccess();
      }
    });
  }

  widthSelectResults(): void {
    this.selectResultsWidth = this.selectRef.nativeElement.offsetWidth;
  }

  ngOnDestroy(): void {
    if (this.isMobileSelect) {
      this.outputSubscription.unsubscribe();
    }
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  handleControl(event) {
    this.errors = Object.keys(event);
    this.handlerError.emit(this.errors);

    this.isErrorLine = false;
  }

  createForm(): void {
    this.form = new FormGroup({
      select: new FormControl(this.item, this.required ? Validators.compose([Validators.required]) : null)
    });
  }

  openItemsResult() {
    if (!this.disabled) {
      this.inFocus = true;
      if (this.isMobileSelect) {
        this.openModalDialog();
      } else {
        if (this.iconOpen) {
          this.validationMoment.next(true);
          this.statusLinesErrorSuccess();
        }

        this.iconOpen = !this.iconOpen;
      }

    }
  }

  openModalDialog(): void {
    this.modalService.openDialog(NGZSelectResultsComponent, {
      childComponent: NGZSelectResultsComponent,
      data: {
        selectedItems: this.items,
        defaultValue: this.defaultValue,
        isMobile: this.isMobileSelect
      },
      outputData: this.outputSubject,
      isOverlay: true,
      onAfterClose: this.onAfterClose
    });
  }

  itemSelect(event) {
    this.item = event !== null ? event : null;

    this.iconOpen = false;
    this.itemSelected.emit(this.item);
    this.isErrorLine = false;

    if (this.inFocus) {
      this.validationMoment.next(true);
      this.form.get('select').setValue(this.item);
      this.inFocus = false;
      this.statusLinesErrorSuccess();
    }
  }

  clickOutside(event) {
    event === null ? this.iconOpen = false : this.iconOpen = this.iconOpen;

    if (this.inFocus) {
      event === null ? this.validationMoment.next(true) : this.validationMoment.next(false);
      this.statusLinesErrorSuccess();
    }

    if (this.inFocus && !this.item) {
      this.inFocus = false;
    }
  }

  statusLinesErrorSuccess() {
    if (this.errors && this.errors[0] !== 'success') {
      this.isErrorLine = true;
    }
  }
}
