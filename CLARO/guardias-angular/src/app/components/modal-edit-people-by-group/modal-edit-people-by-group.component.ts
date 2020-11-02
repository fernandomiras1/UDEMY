import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateGroup, DeletedUsers } from './../../models/group.model';

@Component({
  selector: 'app-modal-edit-people-by-group',
  templateUrl: './modal-edit-people-by-group.component.html',
  styleUrls: ['./modal-edit-people-by-group.component.scss']
})
export class ModalEditPeopleByGroupComponent implements OnInit {

  public showLoadingModal = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalEditPeopleByGroupComponent>) { }

  ngOnInit(): void {
  }

  onUpdatedGroup(deletedUsers: DeletedUsers) {
    this.dialogRef.close(deletedUsers);
  }

  closeModal() {
    this.dialogRef.close();
  }

}
