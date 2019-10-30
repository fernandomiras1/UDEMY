import { Component } from '@angular/core';
import { ICustomDialogOptions } from '../../../../lib/src/components/custom-dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'dsn-politica',
  templateUrl: './politica.component.html',
  styleUrls: ['./politica.component.scss']
})
export class PoliticaComponent implements ICustomDialogOptions {
  onActionClose: Subject<any>;
}
