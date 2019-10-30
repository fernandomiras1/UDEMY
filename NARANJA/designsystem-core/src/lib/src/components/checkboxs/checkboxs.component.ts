import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'z-checkboxs',
  templateUrl: './checkboxs.component.html',
  styleUrls: ['./checkboxs.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGZContainerCheckboxsComponent),
    multi: true
  }]
})
export class NGZContainerCheckboxsComponent implements ControlValueAccessor, OnInit {
  @Input() listCheckboxs: any[] = [];
  @Input() fatherCheckbox: any = null;
  @Input() text = '';
  @Output() checkboxChange: EventEmitter<any> = new EventEmitter<any>();
  private propagateChange = (_: any) => { };

  ngOnInit(): void {
    for (const checkbox of this.listCheckboxs) {
      if (checkbox.listCheckboxs) {
        this.checkFather(checkbox);
      }
    }
  }

  checkSelected(event) {
    let sendEvent;
    this.checkChildrens(event);
    this.checkFather(this.fatherCheckbox);
    if (event.object) {
      sendEvent = event.object;
    } else {
      sendEvent = event;
    }
    this.checkboxChange.emit(sendEvent);
  }

  checkFather(fatherCheckbox: any): void {
    if (fatherCheckbox) {
      const countDisabledChildren = fatherCheckbox.listCheckboxs
        .filter(children => children.disabled === true).length;
      const countChildren = fatherCheckbox.listCheckboxs.length;
      let countChecked = countDisabledChildren;

      fatherCheckbox.listCheckboxs.forEach((childrenCheckbox) => {
        if (childrenCheckbox.selected) {
          countChecked += 1;
        }
      });

      if (countChecked === countDisabledChildren) {
        fatherCheckbox.selected = false;
        fatherCheckbox.indeterminate = false;
      } else if (countChildren === countChecked) {
        fatherCheckbox.selected = true;
        fatherCheckbox.indeterminate = false;
      } else {
        fatherCheckbox.selected = false;
        fatherCheckbox.indeterminate = true;
      }
    }
  }

  checkChildrens(checkbox, isChildren: boolean = false): void {
    !isChildren ? checkbox.selected = !checkbox.selected : checkbox.selected = checkbox.selected;
    checkbox.indeterminate = false;
    if (checkbox.listCheckboxs && checkbox.listCheckboxs.length > 0) {
      checkbox.listCheckboxs.forEach((checkboxChildren) => {

        if (checkbox.selected && !checkboxChildren.disabled) {
          checkboxChildren.selected = true;
          checkboxChildren.indeterminate = false;

          if (checkboxChildren.listCheckboxs && checkboxChildren.listCheckboxs.length > 0) {
            this.checkChildrens(checkboxChildren, true);
          }
        } else if (!checkbox.selected && !checkboxChildren.disabled) {
          checkboxChildren.selected = false;
          checkboxChildren.indeterminate = false;

          if (checkboxChildren.listCheckboxs && checkboxChildren.listCheckboxs.length > 0) {
            this.checkChildrens(checkboxChildren, true);
          }
        }
      });

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
      this.listCheckboxs = obj;
    }
  }
}
