export class Documentation {
  public simpleHtml = `<!--HTML-->
  <z-card>
    <div *ngFor="let item of listSimple; let index=index">
      <z-list [index]="index">
        <div primaryTitle>
          <div class="{{item.classTextPrimary}}">
            {{item.textPrimary}}
          </div>
        </div>
        <div primarySubtitle>
          <div class="{{item.classSubTextPrimary}}">
            {{item.subTextPrimary}}
          </div>
        </div>
        <div secondaryTitle>
          <div class="{{item.classTextSecondary}}">
            {{item.textSecondary}}
          </div>
        </div>
        <div secondarySubtitle>
          <div class="{{item.classSubTextSecondary}}">
            {{item.subTextSecondary}}
          </div>
        </div>
      </z-list>
    </div>
  </z-card>`;

  public simpleTs = `// TS - Formato del objeto
  ...{
    textPrimary: 'Pagaste Netflix',
    subTextPrimary: '20/MAY',
    textSecondary: '-U$S 19,20',
    subTextSecondary: '-$729,40',
    colorSubTextSecondary: 'z-error'
  },{
    textPrimary: 'Pagaste ECOGAS',
    subTextPrimary: '20/MAY',
    colorSubTextPrimary: 'z-warning',
    textSecondary: '-$399',
    subTextSecondary: ''
  },{
    textPrimary: 'Recibiste de Maria De Los Remedios',
    subTextPrimary: '04/ABR',
    textSecondary: '$3.249',
    subTextSecondary: ''
  }...`;

  public simpleCss = `
  .z-success {
    color: $color-success-700;
  }

  .z-error {
    color: $color-error-700;
  }

  .z-warning {
    color: $color-warning-700;
  }`;

  public simpleMetaIconHtml = `<!--HTML-->
  <z-card>
    <div *ngFor="let item of listSimpleMetaIcon; let index=index">
      <z-list [index]="index">
        <div primaryTitle>
          {{item.textPrimary}}
        </div>
        <div primarySubtitle>
          {{item.subTextPrimary}}
        </div>
        <div secondaryTitle>
          {{item.textSecondary}}
        </div>
        <div secondarySubtitle>
          {{item.subTextSecondary}}
        </div>
        <div right>
          <div class="icon icon-example">
            <div class="icon-angle-right size-16"></div>
          </div>
        </div>
      </z-list>
    </div>
  </z-card>`;

  public simpleMetaIconTs = `// TS - Formato del objeto
  ...
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
  }...`;

  public visualSupportImageHtml = `<!--HTML-->
  <z-card>
    <div *ngFor="let item of listVisualSupportImage; let index=index">
      <z-list [index]="index">
        <div left>
          <z-avatar [size]="'large'" [urlImg]="item.urlAvatar"></z-avatar>
        </div>
        <div primaryTitle>
          {{item.textPrimary}}
        </div>
        <div primarySubtitle>
          {{item.subTextPrimary}}
        </div>
        <div secondaryTitle>
          {{item.textSecondary}}
        </div>
        <div secondarySubtitle>
          {{item.subTextSecondary}}
        </div>
      </z-list>
    </div>
  </z-card>`;

  public visualSupportImageTs = `...
  {
    textPrimary: 'Victoria Kellerman',
    subTextPrimary: '351 6598547',
    urlAvatar: 'https://scontent-eze1-1.xx.fbcdn.net/v/t1.0-9/47108571_10218089231529103_7057558434803089408_n.jpg?' +
        '_nc_cat=100&_nc_ht=scontent-eze1-1.xx&oh=f48495c2842942f1ad885d0af427dd18&oe=5D47DE2D'
  }...`;

  public visualSupportIconHtml = `<!--HTML-->
  <z-card>
    <div *ngFor="let item of listFour; let index=index">
      <z-list [index]="index" [disabled]="item.disabled">
        <div left>
          <z-container-icon [size]="'very-small'" [iconName]="item.iconName" [disabled]="item.disabled"></z-container-icon>
        </div>
        <div primaryTitle>
          {{item.textPrimary}}
        </div>
        <div primarySubtitle>
          {{item.subTextPrimary}}
        </div>
        <div secondaryTitle>
          {{item.textSecondary}}
        </div>
        <div secondarySubtitle>
          {{item.subTextSecondary}}
        </div>
        <div right>
          <div class="icon icon-example">
            <div class="icon-angle-right size-16"></div>
          </div>
        </div>
      </z-list>
    </div>
  </z-card>`;

  public visualSupportIconTs = `...
  {
    textPrimary: 'Otro plan',
    subTextPrimary: 'Con intereses',
    textSecondary: '$196,75',
    subTextSecondary: '',
    iconName: 'icon-cards',
    disabled: true
  }...`;

  public controlRadioButtonHtml = `<!--HTML-->
  <z-card>
    <div *ngFor="let item of listFive; let index=index">
      <z-list [index]="index" (elementSelected)="radioSelected($event)" [disabled]="item.disabled">
        <div class="title" primaryTitle>
          {{item.textPrimary}}
        </div>
        <div primarySubtitle>
          {{item.subTextPrimary}}
        </div>
        <div secondaryTitle>
          {{item.textSecondary}}
        </div>
        <div secondarySubtitle>
          {{item.subTextSecondary}}
        </div>
        <div right>
          <z-radiobutton [radiobutton]="item.radiobutton" [index]="index"></z-radiobutton>
        </div>
      </z-list>
  </div>
</z-card>`;

  public controlRadioButtonTs = `...
  {
    textPrimary: 'Tarjeta de crédito',
    subTextPrimary: 'Se acredita en el acto',
    radiobutton: { selected: false, disabled: false }
  }
  ...
  radioSelected(event) {
    this.listFive.forEach((item, index) => {
      item.radiobutton.selected = false;
      if (event === index) {
        item.radiobutton.selected = true;
      }
    });
  }
  ...
  `;

  public controlCheckboxHtml = `<!--HTML-->
  <z-card>
    <div *ngFor="let item of listSix; let index=index">
      <z-list [index]="index" (elementSelected)="checkSelected($event)">
        <div primaryTitle>
          {{item.textPrimary}}
        </div>
        <div primarySubtitle>
          {{item.subTextPrimary}}
        </div>
        <div secondaryTitle>
          {{item.textSecondary}}
        </div>
        <div secondarySubtitle>
          {{item.subTextSecondary}}
        </div>
        <div right>
          <z-checkbox [checkbox]="item.checkbox"></z-checkbox>
        </div>
      </z-list>
    </div>
  </z-card>`;

  public controlCheckboxTs = `...
  {
    textPrimary: 'Naranja',
    subTextPrimary: '**** **** **** 3423',
    checkbox: { selected: false, disabled: false }
  }...`;

  public controlswitchHtml = `<!--HTML-->
  <z-card>
    <div *ngFor="let item of listSeven; let index=index">
      <z-list [index]="index" (elementSelected)="SwitchSelected($event)">
        <div primaryTitle>
          {{item.textPrimary}}
        </div>
        <div primarySubtitle>
          {{item.subTextPrimary}}
        </div>
        <div secondaryTitle>
          {{item.textSecondary}}
        </div>
        <div secondarySubtitle>
          {{item.subTextSecondary}}
        </div>
        <div right>
            <z-switch [switch]="item.switch" [type]="'left-align'"></z-switch>
        </div>
      </z-list>
    </div>
  </z-card>`;

  public controlSwitchTs = `...
  {
    textPrimary: 'Naranja',
    subTextPrimary: '**** **** **** 3423',
    switch: { selected: false, disabled: false, text: '' }
  }...`;

  public informativeHtml = `<!--HTML-->
  <z-card>
    <div *ngFor="let item of listInformative; let index=index">
      <z-list [index]="index" [clickable]="false">
        <div primaryTitle>
          {{item.textPrimary}}
        </div>
        <div primarySubtitle>
          {{item.subTextPrimary}}
        </div>
        <div secondaryTitle>
          {{item.textSecondary}}
        </div>
        <div secondarySubtitle>
          {{item.subTextSecondary}}
        </div>
      </z-list>
    </div>
  </z-card>`;

  public informativeTs = `...
  {
    textPrimary: 'Pagaste Netflix',
    subTextPrimary: '20/MAY',
    textSecondary: '-U$S 19,20',
    subTextSecondary: '-$729,40'
  }...`;
}
