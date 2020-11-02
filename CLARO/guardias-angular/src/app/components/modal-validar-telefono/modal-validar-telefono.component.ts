import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-validar-telefono',
  templateUrl: './modal-validar-telefono.component.html',
  styleUrls: ['./modal-validar-telefono.component.scss']
})
export class ModalValidarTelefonoComponent {

  public message:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalValidarTelefonoComponent>,
  )
  {
    let {message} = data;
    this.message = message
  }

  close(){
    this.dialogRef.close();
  }

}
