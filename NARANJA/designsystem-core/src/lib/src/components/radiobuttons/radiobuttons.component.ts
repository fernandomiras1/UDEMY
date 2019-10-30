import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'z-radiobuttons',
  templateUrl: './radiobuttons.component.html',
  styleUrls: ['./radiobuttons.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGZContainerRadiobuttonsComponent),
    multi: true
  }]
})
export class NGZContainerRadiobuttonsComponent implements ControlValueAccessor {
  @Input() listRadioButtons: any[] = [];
  @Input() text = '';
  @Output() radioButtonChange: EventEmitter<any> = new EventEmitter<any>();
  private propagateChange = (_: any) => { };

  radioSelected(index: number) {
    for (let i = 0; i < this.listRadioButtons.length; i += 1) {
      this.listRadioButtons[i].selected = false;
    }

    this.listRadioButtons[index].selected = true;
    this.radioButtonChange.emit(this.listRadioButtons[index]);
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
      this.listRadioButtons = obj;
    }
  }
}
