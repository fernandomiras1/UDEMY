import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'z-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class NGZChipComponent {
  @Input() chip = { id: 0, selected: false, disabled: false, text: '' };
  @Input() index: number;
  @Input() isLast: boolean;
  @Input() isRadio: boolean;
  @Output() chipSelected: EventEmitter<number> = new EventEmitter<number>();

  checkChip() {
    this.chip.selected = !this.isRadio ? !this.chip.selected : true;
    this.chipSelected.emit(this.index);
  }

}
