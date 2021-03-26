import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-profile-validations',
  templateUrl: './modal-profile-validations.component.html',
  styleUrls: ['./modal-profile-validations.component.scss']
})
export class ModalProfileValidationsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalProfileValidationsComponent>) {
    }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
