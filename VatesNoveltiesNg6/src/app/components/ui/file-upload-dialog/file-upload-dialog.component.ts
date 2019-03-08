import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { SalaryToPayService } from 'src/app/services/salary-to-pay/salary-to-pay.service';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent implements OnInit {
  public uploader: FileUploader;
  private _fileName: string;

  constructor(public dialogRef: MatDialogRef<null>, private _snackBar: MatSnackBar, private _salaryToPayService: SalaryToPayService, private _authService: AuthService) {}

  ngOnInit(): void {
    this.initializeUploader();
  }

  public cleanFileInput(): void {
    this.uploader.clearQueue();
  }

  public onProcessFile(): void {
    this._salaryToPayService.processFile(this._fileName).subscribe((response: any) => {
      this._snackBar.open(`Se procesaron ${ response.SuccessCount } Registros - Quedaron ${ response.FailedCount } pendientes`, 'Aceptar', {
        duration: 3000
      });
      this.dialogRef.close();
    }, () => {
      this._snackBar.open('Se ha producido un error al procesar', 'Aceptar', {
        duration: 4000
      });
    });
  }

  public onNoClick(): void {
    this.uploader.cancelAll();
    this.dialogRef.close();
  }

  // Este metodo permite subir el excel
  private initializeUploader(): void {
    this.uploader = new FileUploader({
      url: environment.novApiUrl + 'api/FileUpload/UploadSalaryToPayFile',
      authToken: 'Bearer ' + this._authService.getTokenData('accessToken'),
      isHTML5: true,
      allowedFileType: ['xls'],
      allowedMimeType: [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.template'
      ],
      removeAfterUpload: false,
      autoUpload: true,
      queueLimit: 1,
      maxFileSize: 5 * 1024 * 1024 // 5 MB
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        this._fileName = JSON.parse(response).FileName;
      }
    };

    this.uploader.onErrorItem = (response) => {
      if (response) {
        console.log(response);
      }
    };
  }
}
