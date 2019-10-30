import { Component } from '@angular/core';

@Component({
  selector: 'dsn-kslists',
  templateUrl: './ks-lists.component.html',
  styleUrls: ['./ks-lists.component.scss']
})
export class KsListsComponent {

  public listOne: any[] = [
    {
      textPrimary: 'Fernando Miras',
      subTextPrimary: '351 6598457',
      urlAvatar: 'https://media.licdn.com/dms/image/C4E03AQEp3pf0ULlLUg/profile-displayphoto-shrink_800' +
      '_800/0?e=1567641600&v=beta&t=IE09HFhGbBluPNxFvJRznBAPj4AbeG68qIlrnKhjZ5o'
    },
    {
      textPrimary: 'Lucas Cargnelutti',
      subTextPrimary: '3525 652335',
      urlAvatar: 'https://media.licdn.com/dms/image/C4E03AQGUrnPB_4cxUg/profile-displayphoto-shr' +
      'ink_200_200/0?e=1567641600&v=beta&t=6t2m7zDM454NtA0HNccD6eH7ArkGiUk1r12LvVtruFQ'
    },
    {
      textPrimary: 'Alfredo Barros',
      subTextPrimary: '351 6852335',
      urlAvatar: 'https://media.licdn.com/dms/image/C4D03AQEtu4lIMH2iKw/profile-displayphoto-s' +
      'hrink_800_800/0?e=1567641600&v=beta&t=Dq5dVbExrGSt4KNKIw3lX0zSqy8v5gCxAUJfe0Ssw3o'
    },
    {
      textPrimary: 'Kevin Roth',
      subTextPrimary: '351 2259124',
      urlAvatar: 'https://media.licdn.com/dms/image/C4E03AQErMIF64e9oFg/profile-displayphoto-' +
      'shrink_800_800/0?e=1567641600&v=beta&t=cRQHRRzAODfUcnXakprK15jR9gfr9kVH40NWc7UZEpA'
    }
  ];

  public listTwo: any[] = [
    {
      textPrimary: 'Pagaste Netflix',
      subTextPrimary: '20/MAY',
      textSecondary: '-U$S 19,20',
      classTextSecondary: 'z-error',
      subTextSecondary: '-$729,40'
    },
    {
      textPrimary: 'Pagaste ECOGAS',
      subTextPrimary: '20/MAY',
      textSecondary: '-$399',
      classTextSecondary: 'z-error',
      subTextSecondary: ''
    },
    {
      textPrimary: 'Recibiste de Maria De Los Remedios',
      subTextPrimary: '',
      textSecondary: '$3.249',
      subTextSecondary: ''
    }];

  public listThree: any[] = [
    {
      textPrimary: 'Plan Z en 1',
      subTextPrimary: 'Pagás todo sin interés',
      textSecondary: '$5.392'
    },
    {
      textPrimary: 'Plan Z en 2',
      subTextPrimary: 'Sin intereses',
      textSecondary: '$3.392,80'
    },
    {
      textPrimary: 'Plan Z en 3',
      textSecondary: '$2.726,39'
    }];

  public listFour: any[] = [
    {
      textPrimary: 'Tarjeta de crédito',
      subTextPrimary: 'Se acredita en el acto',
      textSecondary: '',
      subTextSecondary: '',
      iconName: 'icon-cards'
    },
    {
      textPrimary: 'Tarjeta de débito',
      subTextPrimary: 'Se acredita en el acto',
      textSecondary: '',
      subTextSecondary: '',
      iconName: 'icon-cards'
    },
    {
      textPrimary: 'Tarjeta prepaga',
      subTextPrimary: 'Se acredita en el acto',
      textSecondary: '',
      subTextSecondary: '',
      iconName: 'icon-cards',
      disabled: true
    }];

  public listFive: any[] = [
    {
      textPrimary: 'Tarjeta de crédito',
      subTextPrimary: 'Se acredita en el acto',
      radiobutton: { selected: false, disabled: false }
    },
    {
      textPrimary: 'Pago Fácil',
      subTextPrimary: 'Demora hasta 48 hs',
      radiobutton: { selected: false, disabled: false }
    },
    {
      textPrimary: 'CBU/Alias',
      subTextPrimary: 'Se acredita en el acto',
      disabled: true,
      radiobutton: { selected: false, disabled: true }
    }];

  public listSix: any[] = [
    {
      textPrimary: 'Naranja',
      subTextPrimary: '**** **** **** 3423',
      checkbox: { selected: false, disabled: false }
    },
    {
      textPrimary: 'Naranja VISA',
      subTextPrimary: '**** **** **** 1003',
      checkbox: { selected: false, disabled: false }
    },
    {
      textPrimary: 'Naranja AMEX',
      subTextPrimary: '**** **** **** 3565',
      checkbox: { selected: false, disabled: false }
    }];

  public listSeven: any[] = [
    {
      textPrimary: 'Nueva compra',
      subTextPrimary: 'Cada vez que realices una compra',
      switch: { selected: false, disabled: false, text: '' }
    },
    {
      textPrimary: 'Pago rechazado',
      subTextPrimary: 'Cuando haya un problema con tu pago',
      switch: { selected: false, disabled: false, text: '' }
    },
    {
      textPrimary: 'Servicio vencido',
      subTextPrimary: 'Cuando se venza una factura',
      switch: { selected: false, disabled: false, text: '' }
    }
  ];

  radioSelected(event) {
    this.listFive.forEach((item, index) => {
      item.radiobutton.selected = false;
      if (event === index) {
        item.radiobutton.selected = true;
      }
    });
  }

  checkSelected(index) {
    this.listSix.forEach((item, indexAux) => {
      if (indexAux === index) {
        item.checkbox.selected = !item.checkbox.selected;
      }
    });
  }

  switchSelected(index) {
    this.listSeven.forEach((item, indexAux) => {
      if (indexAux === index) {
        item.switch.selected = !item.switch.selected;
      }
    });
  }

}
