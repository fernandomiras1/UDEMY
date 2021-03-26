
import { MatSnackBar } from '@angular/material/snack-bar';

export function errorMsg(matsnackBar: MatSnackBar, msg: string, actionTxt = null) {
  matsnackBar.open(
    msg,
    actionTxt,
    {
      duration: 10000,
      panelClass: ['bg-color-claro', 'txt-white']
    }
  );
}

export function infoMsg(matsnackBar: MatSnackBar, msg: string , actionTxt = null) {
  matsnackBar.open(
    msg,
    actionTxt,
    {
      duration: 10000,
      panelClass: ['txt-white']
    }
  );
}

