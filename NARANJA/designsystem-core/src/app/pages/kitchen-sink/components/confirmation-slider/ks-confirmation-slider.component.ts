import { Component } from '@angular/core';

@Component({
  selector: 'dsn-ksconfirmationslider',
  templateUrl: './ks-confirmation-slider.component.html',
  styleUrls: ['./ks-confirmation-slider.component.scss']
})
export class KsConfirmationSliderComponent {
  public textSlider = 'Deslizá para transferir';
  public isLoading = false;

  public confirmDemo(event) {

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.textSlider = 'Deslizá para transferir';
    },         3000);
  }
}
