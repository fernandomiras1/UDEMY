import { Component } from '@angular/core';

@Component({
  selector: 'dsn-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent {
  description = 'Espacio dedidcado para asentar definiciones que no entrar en las otras categorias.';

  zIndex = [
    {
      title: 'main-content (text, form-inputs, select-options, alerts, cards)',
      number: 1,
      subtitlePrimary: '',
      subTextSecondary: ''
    },
    {
      title: 'sticky - content(header, sticky - button, snackbars, help - menu - trigger)',
      number: 100,
      subtitlePrimary: '',
      subTextSecondary: ''
    },
    {
      title: 'modal - dialog - overlay(full - screen - background)',
      number: 800,
      subtitlePrimary: '',
      subTextSecondary: ''
    },
    {
      title: 'modal-dialog-content (dialog window, navigation-drawer)',
      number: 810,
      subtitlePrimary: '',
      subTextSecondary: ''
    },
    {
      title: 'select - results(lista de elementos en select)',
      number: 850,
      subtitlePrimary: '',
      subTextSecondary: ''
    },
    {
      title: 'top - of - the - world(casos particulares)',
      number: 900,
      subtitlePrimary: '',
      subTextSecondary: ''
    }
  ];

  browserSupport  = [
    {
      urlImg: '../../../../assets/images/chrome.png',
      title: 'Chrome',
      version: 'Version: 70+',
      sf: 'Soporte Funcional: SI',
      sv: 'Optimizado visualmente: SI',
      textState: 'SI',
      state: 'success'
    },
    {
      urlImg: '../../../../assets/images/firefox.png',
      title: 'Firefox',
      version: 'Version: 66+',
      sf: 'Soporte Funcional: SI',
      sv: 'Optimizado visualmente: SI',
      textState: 'SI',
      state: 'succes'
    },
    {
      urlImg: '../../../../assets/images/safari.png',
      title: 'Safari',
      version: 'Version: 11.1+',
      sf: 'Soporte Funcional: SI',
      sv: 'Optimizado visualmente: NO',
      textState: '',
      state: 'warning'
    },
    {
      urlImg: '../../../../assets/images/edge.png',
      title: 'Edge',
      version: 'Version: 15+',
      sf: 'Soporte Funcional: SI',
      sv: 'Optimizado visualmente: NO',
      textState: '',
      state: 'warning'
    },
    {
      urlImg: '../../../../assets/images/opera.png',
      title: 'Opera',
      version: 'Version: 50+',
      sf: 'Soporte Funcional: SI',
      sv: 'Optimizado visualmente: NO',
      textState: '',
      state: 'warning'
    },
    {
      urlImg: '../../../../assets/images/internet_explorer.png',
      title: 'Internet Explorer',
      version: 'Version: 9+',
      sf: 'Soporte Funcional: NO',
      sv: 'Optimizado visualmente: NO',
      textState: 'NO',
      state: 'error'
    },
    {
      urlImg: '../../../../assets/images/android.png',
      title: 'Android Webview',
      version: 'Version: 5+',
      sf: 'Soporte Funcional: NO',
      sv: 'Optimizado visualmente: NO',
      textState: 'NO',
      state: 'error'
    },
    {
      urlImg: '../../../../assets/images/samsung.png',
      title: 'Samsung Internet',
      version: 'Version: 5+',
      sf: 'Soporte Funcional: NO',
      sv: 'Optimizado visualmente: NO',
      textState: 'NO',
      state: 'error'
    }
  ];

  constructor() {
  }

}
