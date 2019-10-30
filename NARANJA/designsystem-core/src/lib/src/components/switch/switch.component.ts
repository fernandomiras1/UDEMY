import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const SwitchAlignType = {
  RIGHT: 'right-align',
  LEFT: 'left-align'
};

const SwitchTypeStyleMapping = new Map<string, any>();
SwitchTypeStyleMapping.set(SwitchAlignType.RIGHT, { 'padding-right': '8px', order: 0 });
SwitchTypeStyleMapping.set(SwitchAlignType.LEFT, { 'padding-left': '8px', order: 1 });

@Component({
  selector: 'z-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGZSwitchComponent),
    multi: true
  }]
})
export class NGZSwitchComponent implements ControlValueAccessor {
  @Input() switch = { selected: false, disabled: false, text: '' };
  @Input()
  set type(type: string) {
    switch (type) {
      case SwitchAlignType.RIGHT: {
        this.typeSwitchAlign = SwitchTypeStyleMapping.get(SwitchAlignType.RIGHT);
        break;
      }
      case SwitchAlignType.LEFT: {
        this.typeSwitchAlign = SwitchTypeStyleMapping.get(SwitchAlignType.LEFT);
        break;
      }
      default: {
        this.typeSwitchAlign = SwitchTypeStyleMapping.get(SwitchAlignType.RIGHT);
      }
    }
  }
  @Output() switchChange: EventEmitter<any> = new EventEmitter<any>();

  typeSwitchAlign = SwitchTypeStyleMapping.get(SwitchAlignType.RIGHT);
  private propagateChange = (_: any) => { };

  switchSelected(): void {
    if (!this.switch.disabled) {
      this.switch.selected = !this.switch.selected;
      this.propagateChange(this.switch.selected);
      this.switchChange.emit(this.switch);
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
      this.switch.selected = obj;
    }
  }

}
