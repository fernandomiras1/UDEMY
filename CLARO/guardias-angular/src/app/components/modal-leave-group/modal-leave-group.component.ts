import { Component, OnInit, Inject,  } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-leave-group',
  templateUrl: './modal-leave-group.component.html',
  styleUrls: ['./modal-leave-group.component.scss']
})
export class ModalLeaveGroupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalLeaveGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
