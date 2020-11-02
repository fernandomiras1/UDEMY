import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-disabled-turn',
  templateUrl: './modal-disabled-turn.component.html',
  styleUrls: ['./modal-disabled-turn.component.scss']
})
export class ModalDisabledTurnComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalDisabledTurnComponent>,) { }

  ngOnInit(): void {
    this.dialogRef.updatePosition({ top: `20px` });
  }
  closeModal() {
    this.dialogRef.close();
  }
}
