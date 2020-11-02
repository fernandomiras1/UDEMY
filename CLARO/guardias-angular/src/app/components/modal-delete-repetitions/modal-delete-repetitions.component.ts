import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete-repetitions',
  templateUrl: './modal-delete-repetitions.component.html',
  styleUrls: ['./modal-delete-repetitions.component.scss']
})
export class ModalDeleteRepetitionsComponent implements OnInit {

  public checkbox:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalDeleteRepetitionsComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close({confirm:false});
  }

  confirm() {
    this.dialogRef.close({confirm:true,checkbox:this.checkbox});
  }

}
