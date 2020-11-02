import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-delete-template',
  templateUrl: './modal-delete-template.component.html',
  styleUrls: ['./modal-delete-template.component.scss']
})
export class ModalDeleteTemplateComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalDeleteTemplateComponent>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  
  cancel(){
    this.dialogRef.close(1);
  }

  confirm(){
    this.dialogRef.close(0);
  }
}
