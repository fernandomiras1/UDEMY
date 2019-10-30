import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'z-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGZRadiobuttonComponent),
    multi: true
  }]
})
export class NGZRadiobuttonComponent implements ControlValueAccessor {
  @Input() radiobutton = { selected: false, disabled: false, text: '' };
  @Input() index: number;
  @Output() radioSelected: EventEmitter<number> = new EventEmitter<number>();
  private propagateChange = (_: any) => { };

  checkRadioButton() {
    if (!this.radiobutton.disabled) {
      this.radiobutton.selected = !this.radiobutton.selected;
      this.propagateChange(this.radiobutton.selected);
      this.radioSelected.emit(this.index);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.radiobutton.selected = obj;
    }
  }
}
