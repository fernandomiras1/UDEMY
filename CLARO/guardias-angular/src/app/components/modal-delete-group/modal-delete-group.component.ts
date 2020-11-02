import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import { MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../../services/home.service';
import { SessionManagerService } from "../../services/session-manager.service";

@Component({
  selector: 'app-modal-delete-group',
  templateUrl: './modal-delete-group.component.html',
  styleUrls: ['./modal-delete-group.component.scss']
})
export class ModalDeleteGroupComponent implements OnInit {

  public id:string;
  public group:string;
  public people:string;
  public quantity:string;
  public type:string;
  public deleting:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalDeleteGroupComponent>,
    private homeservice: HomeService,
  ) 
  {
    let {id,group,people,quantity,type} = data;
    this.id = id;
    this.group = group;
    this.people = people;
    this.quantity = quantity;
    this.type = type;
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  confirm() {
    
    this.deleting = true;
    const user = SessionManagerService.user();
    this.homeservice.deleteGroup(this.id,user.id_usuario)
    .subscribe(res =>{
      window.location.reload()
    });
  }

}
