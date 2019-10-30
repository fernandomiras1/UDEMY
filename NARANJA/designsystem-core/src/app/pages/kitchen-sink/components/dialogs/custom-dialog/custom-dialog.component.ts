import { Component } from '@angular/core';
import { ICustomDialogOptions } from '../../../../../../lib/src/components/custom-dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'dsn-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss']
})
export class KsCustomDialogTestComponent implements ICustomDialogOptions {
  onActionClose: Subject<any>;
}
