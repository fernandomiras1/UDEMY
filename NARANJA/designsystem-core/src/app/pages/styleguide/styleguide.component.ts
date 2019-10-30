import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { Documentation } from './documentation.component';

@Component({
  selector: 'dsn-styleguide',
  templateUrl: './styleguide.component.html',
  styleUrls: ['./styleguide.component.scss']
})
export class StyleguideComponent {
  public documentation: Documentation;
  constructor() {
    this.documentation = new Documentation();
  }
}
