import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { isNullOrUndefined } from 'util';

import { saveAs } from 'file-saver';

import { environment } from 'src/environments/environment';

@Injectable()
export class FileService {
  private _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = environment.novApiUrl + 'api/';
  }

  public downloadExcel(data: IExcelDownload, afterDowload?: Function): void {
    const url: string = this._baseUrl + data.controller + '/' + (!isNullOrUndefined(data.controllerAction) ? data.controllerAction : '');

    this.http.post(url, data.body, { responseType: 'blob' }).subscribe((response: Blob) => {
      saveAs(response, data.fileName + '.xlsx');

      if (!isNullOrUndefined(afterDowload)) { afterDowload(); }
    }, (error: any) => {
      if (!isNullOrUndefined(afterDowload)) { afterDowload(); }
    });
  }
}

export interface IExcelDownload {
  fileName: string;
  controller: string;
  controllerAction?: string;
  body?: any;
}
