import {
  Component, ContentChildren, Input, QueryList, OnDestroy, EventEmitter, Output, OnInit, AfterViewInit, AfterContentInit, OnChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorMessages } from '../custom-validators/custom-validators';
import { ControlMessageComponent } from './control-message.component';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'z-control-messages',
  templateUrl: 'control-messages.component.html',
  styleUrls: ['./validations.component.scss']
})

export class ControlMessagesComponent implements OnInit, OnDestroy, AfterContentInit, OnChanges {
  @Input() control: FormControl = new FormControl();

  @ContentChildren(ControlMessageComponent) controlMessages: QueryList<ControlMessageComponent>;

  private statusChangesSubscription: Subscription;

  @Output() handleControl = new EventEmitter<any>();
  @Output() handleControlCustom = new EventEmitter<any>();

  @Input() success: string;
  @Input() hint: string;
  @Input() alternativeError: string;
  @Input() validationMoment: Observable<boolean>;
  @Input() regExpresion: any;

  public visible = false;
  public customValidation = false;
  public message: string;
  public errorCustom: boolean;

  constructor() {
    this.validationMoment = new Observable<boolean>();
  }

  ngOnInit(): void {
    this.validationMoment.subscribe(
      (resultado) => {
        if (this.regExpresion && this.regExpresion.regExp && resultado) {
          this.initializeControlCustomValidation(resultado);
        } else {
          this.initializeControl(resultado);
        }
      }
    );
  }

  ngOnChanges() {
    if (this.alternativeError !== '') {
      this.message = this.alternativeError;
    }
  }

  ngAfterContentInit() {
    if (this.regExpresion && this.regExpresion.regExp) {
      this.hint = this.regExpresion.message;
    }
    this.initializeControl();
  }

  private initializeControlCustomValidation(resultado) {
    this.errorCustom = false;
    if (resultado.focusOut) {
      this.errorCustom = true;
    }
    const reg = new RegExp(this.regExpresion.regExp);
    this.regExpresion.validate = reg.test(this.control.value);
    this.handleControlCustom.emit(this.regExpresion);
  }

  private initializeControl(resultado?): void {
    this.visible = false;
    if (resultado) {

      this.controlMessages.forEach(controlMessage => controlMessage.show = false);

      if (this.control.invalid) {
        const errors = Object.keys(this.control.errors);

        const firstErrorMessageComponent = this.controlMessages.find((controlMessage) => {
          return controlMessage.showsErrorIncludedIn(errors);
        });
        this.message = '';
        this.visible = resultado;
        if (firstErrorMessageComponent) {
          firstErrorMessageComponent.show = true;
        } else {
          if (this.alternativeError !== '') {
            this.message = this.alternativeError;
          } else {
            this.message = this.errorMessage;
          }
          this.handleControl.emit(this.control.errors);
        }
      }
      if (this.control.valid) {
        this.handleControl.emit({ success: true });
      }
    }

    this.statusChangesSubscription = this.control
      .statusChanges
      .subscribe(() => {
        if (this.control.valid) {
          this.message = '';
          if (this.success !== '') {
            this.visible = true;
            this.message = this.success;
            this.handleControl.emit({ success: true });
          }
          if (this.hint !== '' && this.success === '') {
            this.visible = false;
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
    }
  }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        return ErrorMessages.messageOf(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
}
