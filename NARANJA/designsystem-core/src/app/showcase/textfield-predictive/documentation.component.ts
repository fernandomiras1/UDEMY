export class Documentation {

  public defaultHTML = `<z-textfield-predictive [submit$]="submitDefault$"
  [urlImg]="'../../assets/images/seguros-caja@2x.png'"
  [id]="'predictiveDefault'" [items]="itemsDefault"
  [minLength]="3" [timeFilter]="1000"
  [selectFormControl]="formTextfieldPredictive.get('selectDefault')"
  [text]="'Desarrolladores'"
  (handlerError)="handlerErrorDefault($event)" (itemSelected)="itemSelectedDefault($event)">
</z-textfield-predictive>`;

  public defaultTS = ` itemsDefault = [
    { id: 1, text: 'Lucas Dimattia', disabled: false },
    { id: 2, text: 'Lucas Cargnelutti', disabled: false },
    { id: 3, text: 'Lucas Conci', disabled: false },
    { id: 4, text: 'Marcos P', disabled: false },
    { id: 5, text: 'Fernando M', disabled: false },
    { id: 6, text: 'Alfredo B', disabled: false },
    { id: 7, text: 'Kevin R', disabled: false },
    { id: 8, text: 'Mauro', disabled: false },
    { id: 9, text: 'Joaquin', disabled: false }
  ];

  ngOnInit() { }

  createForm() {
    this.formTextfieldPredictive = new FormGroup({
      selectDefault: new FormControl('')
    });
  }

  itemSelectedDefault(event) {
    this.item = event;
    this.formTextfieldPredictive.get('selectDefault').setValue(event.text);
    this.itemsFilter = this.items;
  }

  handlerErrorDefault(event) {
    if (this.item === null || this.formTextfieldPredictive.get('selectDefault').value !== this.item.text) {
      this.formTextfieldPredictive.get('selectDefault').setValue(null);
      this.item = null;
      this.submit.next(false);
    }
  }`;

  public disabledHTML = `<z-textfield-predictive
  [disabled]="true"
  [submit$]="submit$"
  [items]="itemsFilter"
  [selectFormControl]="formTextfieldPredictive.get('select')"
  [text]="'Predictive'"
  (handlerError)="handlerError($event)"
  (itemSelected)="itemSelected($event)"></z-textfield-predictive>`;

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
      name: 'submit$',
      type: 'Observable<boolean>',
      description: 'Un input que ejacuta las validaciones cuando el padre manda un .next(true)',
      required: 'No',
      value: '-'
    },
    {
      name: 'items',
      type: 'any[]',
      description: 'Propiedades dentro de cada objeto de la lista (text: string, id: number).',
      required: 'Si',
      value: '-'
    },
    {
      name: 'minLength',
      type: 'number',
      description: 'Permite poner un limite minimo de caracteres antes de filtrar',
      required: 'No',
      value: 'Default: 0 '
    },
    {
      name: 'timeFilter',
      type: 'number',
      description: 'Permite un limite de tiempo antes de ejcutar el filtrado',
      required: 'No',
      value: 'Default: 0ms '
    },
    {
      name: 'id',
      type: 'string',
      description: 'Asigna in ID en el tag html Input',
      required: 'No',
      value: '-'
    }
  ];
}
