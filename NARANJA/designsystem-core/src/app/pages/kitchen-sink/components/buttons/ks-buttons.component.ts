import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsn-ksbuttons',
  templateUrl: './ks-buttons.component.html',
  styleUrls: ['./ks-buttons.component.scss']
})
export class KsButtonsComponent implements OnInit {
  isLoadingPrimaryWithSpinner: boolean;
  isLoadingSecondaryWithSpinner: boolean;
  isLoadingStickyWithSpinner: boolean;
  text: string;
  textPrimarywithSpinner: string;
  textSecondaryWithSpinner: string;
  textStickyWithSpinner: string;
  textDisabled: string;
  disabled: boolean;

  constructor() {}

  ngOnInit() {
    this.text = 'Default';
    this.textPrimarywithSpinner = 'Spinner';
    this.textSecondaryWithSpinner = 'Spinner';
    this.textStickyWithSpinner = 'Spinner';
    this.textDisabled = 'Disabled';
  }

  onClickPrimaryWithSpinner() {
    this.isLoadingPrimaryWithSpinner = true;
    setTimeout(() => {
      this.isLoadingPrimaryWithSpinner = false;
    },         3000);
  }

  onClickSecondaryWithSpinner() {
    this.isLoadingSecondaryWithSpinner = true;
    setTimeout(() => {
      this.isLoadingSecondaryWithSpinner = false;
    },         3000);
  }

  onClickStickyWithSpinner() {
    this.isLoadingStickyWithSpinner = true;
    setTimeout(() => {
      this.isLoadingStickyWithSpinner = false;
    },         3000);
  }

}
