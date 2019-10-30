import { Component, Input,
  EventEmitter, Output, OnInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  ViewChild, ElementRef } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject, Observable } from 'rxjs';
import { FormGroup, FormControl, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { ModalService } from '../modal/service/modal.service';
import { KeypressService, DocumentService, isEmpty } from '../../utils/index';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'z-textfield-predictive',
  templateUrl: './textfield-predictive.component.html',
  styleUrls: ['./textfield-predictive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NGZTextfieldPredictiveComponent implements OnInit {

  constructor(
    private modalServiceNg: ModalService,
    private keypressService: KeypressService,
    private cdRef: ChangeDetectorRef,
    private documentService: DocumentService,
    private deviceDetectorService: DeviceDetectorService) {
    this.selectFormControl = new FormControl();
    this.isMobile = this.deviceDetectorService.isMobile();
  }
  @Input() items: any;
  @Input() item = null;
  @Input() urlImg: string;
  @Input() defaultValue = null;
  @Input() submit$: Observable<boolean> = new Observable();
  @Input() required = true;
  @Input() text = '';
  @Input() id = '';
  @Input() minLength = -1;
  @Input() timeFilter = 0;
  @Input() selectFormControl: FormControl;
  @Input() menssagesSuccess: string;
  @Input() menssagesHint: string;
  @Input() menssagesError: string;
  @Input() disabled = false;

  @Output() itemSelected = new EventEmitter<any>();
  @Output() handlerError = new EventEmitter<any>();

  @ViewChild('textfieldModal') textfieldModal: ElementRef;

  itemsFilter = [];
  isMobile: boolean;
  inFocus = false;
  iconOpen = false;
  errors: any;
  isErrorLine = false;
  form: FormGroup;
  flagDefault = false;

  private outputSubject: Subject<any> = new Subject();
  outputSubject$: Observable<any>;

  onAfterClose: Subject<void>;

  iconName = 'icon-angle-down';

  private validationMoment: Subject<any> = new Subject();
  public validationMoment$ = this.validationMoment.asObservable();

  public itemsFilterEmpty(control: AbstractControl): ValidationErrors | null {
    if (!isEmpty(control.value)) {
      return { itemsFilterEmpty: true };
    }
    return null;
  }

  ngOnInit() {
    this.keypressService.keyPressEscape().subscribe((response) => {
      if (response) {
        this.closeModalForOtherMotive();
      }
    });

    this.submit$.subscribe((result) => {
      if (result) {
        this.validationMoment.next(true);
        this.statusLinesErrorSuccess();
      }
    });

    this.selectFormControl.valueChanges.pipe(
      debounceTime(this.timeFilter)).subscribe((data) => {
        this.flagDefault = false;
        this.itemsFilter = [];
        if (data === '') {
          return;
        }
        if (data.length >= this.minLength) {
          this.filter(data);
        }
      });
    this.cdRef.detectChanges();
  }

  private filter(data) {
    this.flagDefault = true;
    const aux = [];
    let text = '';
    if (this.selectFormControl.value) {
      text = this.selectFormControl.value.toLowerCase();
    }
    const searchText = this.normalizeText(text);
    this.items.filter((item) => {
      if (this.normalizeText(item.text).indexOf(searchText) !== -1) {
        aux.push(item);
      }
    });
    this.itemsFilter = aux;
    if (this.itemsFilter.length === 0 && this.selectFormControl.dirty) {
      this.selectFormControl.setValidators([this.selectFormControl.validator, this.itemsFilterEmpty]);
      this.validationMoment.next(true);
    } else {
      this.selectFormControl.setValidators([Validators.required]);
    }
    this.cdRef.detectChanges();
  }

  normalizeText(text: string): string {
    return text.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, '$1$2')
      .normalize().toLowerCase();
  }

  closeModalForOtherMotive(event?) {
    if (this.id !== '' && this.documentService.nativeDocument.body.querySelectorAll(`#${this.id}`).length > 0) {
      this.closeModal(this.id);
    }
  }

  itemSelect(event) {
    this.item = event !== null ? event : null;

    this.iconOpen = false;
    this.itemSelected.emit(this.item);
    this.isErrorLine = false;

    if (this.inFocus) {
      this.validationMoment.next(true);
      this.inFocus = false;
      this.statusLinesErrorSuccess();
    }

    if (this.isMobile) {
      this.closeModal(this.id);
    }
  }

  openItemsResult() {
    if (!this.disabled) {
      this.inFocus = true;

      if (this.iconOpen) {
        this.validationMoment.next(true);
        this.statusLinesErrorSuccess();
      }
      this.iconOpen = !this.iconOpen;
    }
  }

  statusLinesErrorSuccess() {
    if (this.errors && this.errors[0] !== 'success') {
      this.isErrorLine = true;
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

  handleControl(event) {
    this.errors = Object.keys(event);
    this.handlerError.emit(this.errors);
    this.isErrorLine = false;
  }

  openDialog(event, id: string) {
    if (event.focusOn && this.isMobile) {
      this.modalServiceNg.open(id);
    }
  }

  closeModal(id: string) {
    this.modalServiceNg.close(id);
  }

  itemSelectedList(event) {
    if (event) {
      this.itemSelect(event[1]);
    }
  }
}
