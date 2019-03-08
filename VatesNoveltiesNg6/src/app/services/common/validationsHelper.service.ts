import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsHelperService {
  public regularExpressions = {
    onlyIntegerNumbers: '^-?[0-9]*$'
  };

  constructor() {}

  public numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
