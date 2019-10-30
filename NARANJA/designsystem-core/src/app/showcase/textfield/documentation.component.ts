export class Documentation {
  public defaultValidationHTML = `
  <div [formGroup]="formTextfield">
    <z-textfield text="Nombre" [id]="'nameDefault'" [formControl]="formTextfield.get('defaultName')"
      [menssagesHint]="'Como aparece en la tarjeta'"></z-textfield>
    <z-textfield [formControl]="formTextfield.get('defaultDni')" [id]="'number'" text="DNI"></z-textfield>
  </div>`;

  public defaultValidationTS = `
  this.formTextfield = new FormGroup({
      defaultName: new FormControl(''),
      defaultDni: new FormControl('', CustomValidators.number)
    });`;

  public onfocusValidation = `
  <div [formGroup]="formTextfield">
    <z-textfield [id]="'numberOnFocus'"
      [formControl]="formTextfield.get('onFocusNumberCard')" text="Número de tarjeta" [momentOfValidate]="'onFocus'"
      [menssagesHint]="'Como aparece en el plástico'"></z-textfield>
    <z-textfield [id]="'dni'" [formControl]="formTextfield.get('onFocusDni')" [momentOfValidate]="'onFocus'"
                text="DNI"></z-textfield>
  </div>`;

  public onSubmitValidation = `<z-textfield [id]="'numberTarjeta'" text="Número de tarjeta" [momentOfValidate]="'submit'"
  [formControl]="formTextfield.get('onSubmitNumberCard')" [submit$]="submit$"
  (handlerError)="handlerErrorEvent($event)" [menssagesHint]="'Como aparece en el plástico'"></z-textfield>
  <z-textfield [id]="'numberDni'" [momentOfValidate]="'submit'" [submit$]="submit"
  [formControl]="formTextfield.get('onSubmitDni')" (handlerError)="handlerErrorEvent($event)" text="DNI">
</z-textfield>
<z-button text="Enviar" (clickButton)="onClickSubmit()"></z-button>
      `;

  public onSubmitValidationTs = `
  private submit: Subject<boolean> = new Subject();
  submit$ = this.submit.asObservable();

  onClickSubmit() {
    this.submit.next(true);
  }`;

  public multipleErrorFeedbacksHtml = `<div class="row margin-top-8">
  <div class="col-xs-12 col-sm-12 col-md-4 margin-top-24">
  <z-textfield [id]="'monto'" text="Monto" [menssagesHint]="'No puede ser mayor a $100'"
  [menssagesError]="menssagesErrorMultiple" [momentOfValidate]="'submit'" [submit$]="submitMultiple"
  [formControl]="formTextfield.get('multipleerrorMonto')"
  (handlerError)="handlerErrorEventMultiple($event)">
</z-textfield>
  </div>
</div>
<div class="row margin-top-24 margin-bottom-48">
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
    <z-button text="Enviar" (clickButton)="onClickSubmitMultiple()"></z-button>
  </div>
</div>`;

  public multipleErrorFeedbacksTs = `...
onClickSubmitMultiple() {
  this.submitMultiple.next(true);
}

handlerErrorEventMultiple(event) {
   if (event[0]) {
     if (event[0] !== 'success') {
       this.count = this.count + 1;
       console.log(this.count);
       if (this.count === 3) {
         this.menssagesErrorMultiple = "Ingreso mas de" + this.count + "veces mal. ";
       }
     } else {
       this.count = 0;
       this.menssagesErrorMultiple = '';
     }
     this.submit.next(false);
   }
}`;

  public successValidation = `<z-textfield [id]="'numberSuccess1'" [formControl]="formTextfield.get('successNumberCard')"
  text="Número de tarjeta" [menssagesSuccess]="'El número es válido'"
  [menssagesHint]="'Como aparece en el plástico'"></z-textfield>
      `;

  public successValidationOnFocus = `<z-textfield [id]="'numberSuccess2'" [formControl]="formTextfield.get('successNumberCard')"
  text="Número de tarjeta" [menssagesSuccess]="'El número es válido'" [momentOfValidate]="'onFocus'"
  [menssagesHint]="'Como aparece en el plástico'"></z-textfield>`;

  public texfieldWithCheckbox = `<z-textfield [id]="'checkbox'" text="Número" [disabled]="disabledTextfieldCheckbox"
  [formControl]="formTextfield.get('checkboxNumberDom')">
  <z-checkbox [checkbox]="checkbox" (checkboxChecked)="checkSelected()"></z-checkbox>
</z-textfield>`;

  public disabled = `<z-textfield [disabled]="true" text="Nombre y Apellido"></z-textfield>
      `;

  public phoneHtml = `<z-textfield text="Telefono" [type]="'text'"
  [id]="'phone'" [formControl]="formTextfield.get('phoneNumber')"
  (focus)="handleControlCustomPhone($event)"></z-textfield>`;

  public phoneTs = ` this.formTextfield = new FormGroup({
      phoneNumber: new FormControl('', Validators.compose([
        this.customValidators.number, this.customValidators.minlength(8),
        this.customValidators.maxlength(10), this.customValidators.phone]))
    });`;

  public emailHtml = `<z-textfield text="Email" [type]="'text'"
  [id]="'email'" [formControl]="formTextfield.get('email')"></z-textfield>`;

  public emailTs = `this.formTextfield = new FormGroup({
      email: new FormControl('', Validators.compose([this.customValidators.email]))
    });`;

  public passwordHtml = `<z-textfield text="Contraseña" [type]="typePassword" [id]="'password'"
  [formControl]="formTextfield.get('password')" (focus)="handleControlCustom($event)">
  <z-container-icon
    *ngIf="formTextfield.get('password').value"
    [size]="'very-small'"
    [iconName]="nameIcon"
    (clickEvent)="clickEventIconPass($event)">
  </z-container-icon>
  <div zControlMessages>
    <z-control-messages *ngFor="let item of regExpList" [hidden]="!showCustonValidation"
      [validationMoment]="validationMoment$" [regExpresion]="item" [control]="formTextfield.get('password')"
      (handleControlCustom)="handleControlCustom($event)">
    </z-control-messages>
  </div>
</z-textfield>`;

  public passwordTs = `
  private validationMoment: Subject<any> = new Subject();
  public validationMoment$ = this.validationMoment.asObservable();

  nameIcon = 'icon-hide-pass';
  formTextfield: FormGroup;
  typePassword = 'password';
  public showCustomValidation = true;

  ngOnInit() {
    this.crearForm();
    this.formTextfield.get('password').statusChanges.subscribe(() => {
      this.validationMoment.next(true);
    });
  }

  crearForm() {
    this.formTextfield = new FormGroup({
      password: new FormControl('')
    });
  }

  public regExpList = [
    {
      id: 1,
      message: 'Ingresar una mayúscula',
      regExp: /[A-Z]+/g
    },
    {
      id: 2,
      message: 'Ingresar un número',
      regExp: /[0-9]/g
    },
    {
      id: 3,
      message: 'Ingresar una minúscula',
      regExp: /[a-z]+/g
    },
    {
      id: 4,
      message: 'Ingresar entre 8 y 16 caracteres',
      regExp: /\b[a-zA-Z0-9!"#$%&/()=?¡¨*\[\].:;,-_]{8,16}\b/g,
      // pedir bien la expresion porque no se ven caracteres especiales
      validate: false
    }
  ];

  handleControlCustom(event) {
    if (event && event.focusOut) {
      this.validationCustom(event);
      this.validationMoment.next(event);
    }
    if (event.validate) {
      for (const element of this.regExpList) {
        if (element.id === event.id && event.validate) {
          element.validate = event.validate;
        }
      }
      this.validationCustom();
    }
  }

  validationCustom(response?) {
    if (this.regExpList) {
      for (const element of this.regExpList) {
        if (!element.validate) {
          this.showCustomValidation = true;
          return false;
        }
      }
      if (response && response.focusOut) {
        this.showCustomValidation = false;
      }
    }
    return true;
  }

  clickEventIconPass(event) {
    if (event && this.nameIcon === 'icon-hide-pass') {
      this.nameIcon = 'icon-show-pass';
      this.typePassword = 'text';
      return;
    }
    if (event && this.nameIcon === 'icon-show-pass') {
      this.nameIcon = 'icon-hide-pass';
      this.typePassword = 'password';
      return;
    }
  }`;

  public validations = [
    {
      name: 'required',
      type: ' - ',
      description: 'Valida que se hayan cargado datos',
      required: 'No',
      value: ''
    },
    {
      name: 'number',
      type: 'numeric',
      description: 'Valida que se hayan cargado solo números',
      required: 'No',
      value: ' - '
    },
    {
      name: 'email',
      type: 'text',
      description: 'Valida que se haya cargado un e-mail válido',
      required: 'No',
      value: ' - '
    },
    {
      name: 'phone',
      type: 'numeric',
      description: 'Valida que se hayan cargado solo números (por el momento)',
      required: 'No',
      value: ' - '
    },
    {
      name: 'maxLength',
      type: 'char length',
      description: 'Valida que no se supere la cantidad de caracteres máximos solicitados',
      required: 'No',
      value: ''
    },
    {
      name: 'minLength',
      type: 'char length',
      description: 'Valida que no se supere la cantidad de caracteres mínimos solicitados',
      required: 'No',
      value: ''
    },
    {
      name: 'minValue',
      type: 'numeric',
      description: 'Valida que no se haya cargado un valor menor al mínimo solicitado',
      required: 'No',
      value: ''
    },
    {
      name: 'maxValue',
      type: 'numeric',
      description: 'Valida que no se haya cargado un valor mayor al máximo solicitado',
      required: 'No',
      value: ''
    }
  ];

  public inputsDocumentation = [
    {
      name: 'formControl',
      type: 'FormControl',
      description: 'Inicializa el FormControl del componente para inicializarlo.',
      required: 'Si',
      value: '-'
    },
    {
      name: 'text',
      type: 'string',
      description: 'Texto del label. Ejemplo: "Nombre y apellido"',
      required: 'No',
      value: ''
    },
    {
      name: 'type',
      type: 'string',
      description: 'El tipo de formato que tendrá el contenedor',
      required: 'No',
      value: 'text o password'
    },
    {
      name: 'required',
      type: 'boolean',
      description: 'Valida si es requerido, por defecto esta en true, no valido para validacones custom',
      required: 'No',
      value: 'true'
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Para deshabilitar el textfield',
      required: 'No',
      value: 'false'
    },
    {
      name: 'messagesSuccess',
      type: 'string',
      description: 'Mensaje que indica que el texto ingresado es correcto',
      required: 'No',
      value: '-'
    },
    {
      name: 'messagesHint',
      type: 'string',
      description: 'Mensaje que aclara cómo completar el campo',
      required: 'No',
      value: '-'
    },
    {
      name: 'messagesError',
      type: 'string',
      description: 'Mensaje que indica que el texto ingresado es inválido',
      required: 'No',
      value: '-'
    },
    {
      name: 'statusMoment$',
      type: 'Observable<boolean>',
      description: 'Un input que te devuelve el estado del input, solo valido pra validaciones custom',
      required: 'No',
      value: '-'
    },
    {
      name: 'submit$',
      type: 'Observable<boolean>',
      description: 'Un input que ejacuta las validaciones cuando el padre manda un .next(true)',
      required: 'No',
      value: '-'
    },
    {
      name: 'id',
      type: 'string',
      description: 'Asigna in ID en el tag html Input',
      required: 'No',
      value: '-'
    }
  ];

  public outputsDocumentation = [
    {
      name: 'handlerError',
      type: 'eventEmitter<boolean>',
      description: 'Se ejecuta siempre que cambia el estado del textfield',
      required: 'No',
      value: 'false'
    },
    {
      name: 'focus',
      type: 'eventEmitter<any>',
      description: 'Devuelve un objeto indicando cuando ocurrio Fuera de Foco. ',
      required: 'No',
      value: 'false'
    }
  ];
  public tokens = `
    import { FORMS_ERROR_MESSAGES, FORMS_CUSTOM_VALIDATORS } from 'zumo';
    ...
    constructor(
      @Inject(FORMS_ERROR_MESSAGES) private formErrorMsg: any,
      @Inject(FORMS_CUSTOM_VALIDATORS) private customValidators: any
    ) {}
    ...
    createFrom() {
      this.formCargaDatos = new FormGroup({
        myControlNumberCard: new FormControl('', this.customValidators.email)
      });
    }
  `;
}
