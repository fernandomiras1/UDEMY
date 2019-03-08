import { Injectable } from '@angular/core';

@Injectable()
export class ButtonService {

  // progress-bar Button
  barButton(text: string, barColor: string, buttonColor: string) {
    const data: any = {
      active: false,
      text: text,
      buttonColor: buttonColor,
      barColor: barColor,
      raised: true,
      mode: 'indeterminate',
      value: 0,
      disabled: false
    };

    return data;
  }

  // progress-spinner
  spinnerButton(text: string, size: number, spinnerColor: string, buttonColor: string) {
    const data: any = {
      active : false,
      text: text,
      spinnerSize: size,
      buttonColor: buttonColor,
      spinnerColor: spinnerColor,
      raised: true,
      mode: 'indeterminate',
      fullWidth: false,
      disabled: false
    };

    return data;
  }
}
