import { Component, DoCheck, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const ChipsComponentType = {
  RADIO: 'radio',
  CHECKBOX: 'checkbox'
};
@Component({
  selector: 'z-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGZContainerChipsComponent),
    multi: true
  }]
})
export class NGZContainerChipsComponent implements DoCheck, ControlValueAccessor {
  @Input() listChips: any[] = [];
  @Input() defaultIndexSelected;
  @Output() chipChecked: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  set type(type: string) {
    switch (type) {
      case ChipsComponentType.RADIO: {
        this.isRadio = true;
        break;
      }
      case ChipsComponentType.CHECKBOX: {
        this.multiple = true;
        break;
      }
      default: {
        this.isRadio = false;
      }
    }
  }

  isRadio = false;
  multiple = false;
  firstTime = true;
  oldChip: any;
  private propagateChange = (_: any) => { };

  ngDoCheck() {
    if (this.defaultIndexSelected !== undefined) {
      if (this.firstTime) {

        if (this.listChips.length > 0) {
          this.firstTime = false;

          if (!this.listChips[this.defaultIndexSelected].disabled) {
            this.listChips[this.defaultIndexSelected].selected = true;
          } else {
            this.defaultIndexSelected = 0;

            if (!this.listChips[this.defaultIndexSelected].disabled) {
              this.listChips[this.defaultIndexSelected].selected = true;
            }
          }
        }

        for (let i = 0; i < this.listChips.length; i += 1) {
          if (this.defaultIndexSelected !== i) {
            this.listChips[i].selected = false;
          }
        }
      }
    }
  }

  chipSelected(index: number) {
    if (!this.multiple) {
      this.listChips.forEach((item, i) => {
        if (index !== i) {
          this.listChips[i].selected = false;
        }
      });
    }
    const newChip = this.listChips[index];

    if (this.isRadio && newChip === this.oldChip) {
      this.oldChip = newChip;
      return;
    }

    this.chipChecked.emit(this.listChips[index]);
    this.oldChip = newChip;
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
      this.listChips = obj;
    }
  }
}
