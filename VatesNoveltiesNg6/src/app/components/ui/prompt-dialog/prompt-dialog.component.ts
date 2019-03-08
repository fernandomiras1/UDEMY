import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IPromtDialogData } from '../../../models/ui/DialogData';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.css']
})
export class PromptDialogComponent {
  public itemData = { comments: '' };

  constructor(public dialogRef: MatDialogRef<PromptDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IPromtDialogData) {
    this.itemData.comments = !isNullOrUndefined(data.comments) ? data.comments : '';
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
