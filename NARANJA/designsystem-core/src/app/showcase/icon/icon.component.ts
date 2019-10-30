import { Component, OnInit } from '@angular/core';
import { Documentation } from './documentation.component';
import { ZumoColors } from '../../../lib/src/utils/enums/index';

@Component({
  selector: 'dsn-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  public icons;
  iconColor = ZumoColors.Brand_500;
  backgroundColor = ZumoColors.Brand_300;

  // tslint:disable-next-line:max-line-length
  description = 'Los iconos son representaciones visuales de comandos, archivos, dispositivos o acciones usados para proveer ayuda, contexto visual y mejorar la usabilidad de las interfaces. Deben ser simples y reflejar con claridad el concepto a comunicar.';
  link = 'https://brandbook.naranja.com/document/248804#/foundations/Iconograf%C3%ADa';
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };
  public documentation: Documentation;

  ngOnInit() {

    this.documentation = new Documentation();
    this.icons = [
      { name: 'icon-add' },
      { name: 'icon-angle-left' },
      { name: 'icon-angle-right' },
      { name: 'icon-apps' },
      { name: 'icon-arrow-left' },
      { name: 'icon-arrow-right' },
      { name: 'icon-bank' },
      { name: 'icon-branch' },
      { name: 'icon-bus' },
      { name: 'icon-cash-in' },
      { name: 'icon-cash-out-atm' },
      { name: 'icon-check' },
      { name: 'icon-check-circle' },
      { name: 'icon-clock' },
      { name: 'icon-cross' },
      { name: 'icon-cross-circle' },
      { name: 'icon-log-out' },
      { name: 'icon-bike' },
      { name: 'icon-motorbike' },
      { name: 'icon-card' },
      { name: 'icon-cog' },
      { name: 'icon-dashboard' },
      { name: 'icon-dog' },
      { name: 'icon-filter' },
      { name: 'icon-help' },
      { name: 'icon-house' },
      { name: 'icon-magnifier' },
      { name: 'icon-summary' },
      { name: 'icon-system' },
      { name: 'icon-menu' },
      { name: 'icon-message' },
      { name: 'icon-qr-code' },
      { name: 'icon-qr-code-scan' },
      { name: 'icon-send' },
      { name: 'icon-ticket' },
      { name: 'icon-trash' },
      { name: 'icon-user' },
      { name: 'icon-arrow-up' },
      { name: 'icon-arrow-down' },
      { name: 'icon-angle-up' },
      { name: 'icon-angle-down' },
      { name: 'icon-face-smile' },
      { name: 'icon-alert-circle' },
      { name: 'icon-tv' },
      { name: 'icon-share' },
      { name: 'icon-save' },
      { name: 'icon-overflow' },
      { name: 'icon-magazine' },
      { name: 'icon-insurance' },
      { name: 'icon-info-circle' },
      { name: 'icon-cash' },
      { name: 'icon-cards' },
      { name: 'icon-car' },
      { name: 'icon-alert' },
      { name: 'icon-show-pass' },
      { name: 'icon-hide-pass' }
    ];
  }

}
