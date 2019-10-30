import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsn-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  list = [];

  constructor() { }

  ngOnInit() {
    this.list = [
      {
        version: 'V 2.6.0',
        date: '04/10/2019',
        description: 'En esta versión se agregan funcionalidades en:',
        descriptionItem: [
          {
            item: 'Textfield-predictive: Se regresa nuevos inputs para poder brindar mas versatilidad (Ver demo). '
          },
          {
            item: 'Dialog: Se agrega nuevo input para desabilitar el Click Out Side. '
          },
          {
            item: 'Select: Se agrega nuevo input dejar comportamiendo descktop en mobile. '
          },
          {
            item: 'Colors: Se define, renombre y publica nueva paleta de colores. '
          },
          {
            item: 'Keypress: Nuevo servicio en la libreria que te permite poder definir' +
            'comportamiento al presionar una tecla en particular (Ver demo). '
          }
        ]
      },
      {
        version: 'V 2.4.1',
        date: '25/09/2019',
        description: 'En esta versión se agregan funcionalidades en:',
        descriptionItem: [
          {
            item: 'Custom Validators: Se regresa nuevamente a expresion regular en EMAIL, ver demo de textfield'
          }
        ]
      },
      {
        version: 'V 2.4.0',
        date: '19/09/2019',
        description: 'En esta versión se agregan funcionalidades en:',
        descriptionItem: [
          {
            item: 'Card: Se resulve bug de select-result por debajo de la card en IE'
          },
          {
            item: 'Textfield-predictive: Se rediseña comportamiento del mismo en desktop con comportamiento DropUp'
          },
          {
            item: 'Dialog: Se corrige un bug donde los dialogs no abrian en safari'
          },
          {
            item: 'Textfield: Se elimina el estilo background al tener una contraseña guardada'
          },
          {
            item: 'Kitchen Sink: Se agrega una ruta de kitchen sink para todos los componentes'
          },
          {
            item: 'Others: Se agregan otras definiciones a Zumo (Soporte navegadores, indexación de componentes, etc)'
          }
        ]
      },
      {
        version: 'V 2.3.7',
        date: '28/08/2019',
        description: 'En esta versión se agregan funcionalidades en:',
        descriptionItem: [
          {
            item: 'Buttons: se mejora definicion de color en estado disabled'
          },
          {
            item: 'Se agrega z-index a custom dialog de 830 manteniendo definion de Diseño '
          }
        ]
      },
      {
        version: 'V 2.3.6',
        date: '27/08/2019',
        description: 'En esta versión se agregan funcionalidades en:',
        descriptionItem: [
          {
            item: 'Listas, se arreglo el error de no visualización de los subtitulos.'
          },
          {
            item: 'Textfield and Textfield-predictive: se resuelve conflicto en IE con los labels.'
          },
          {
            item: 'Se agregan dos nuevos validadores, para fehcas con / y para fechas sin barras.'
          },
          {
            item: 'Textfield se mejora comportamiento cuando vuelven datos del back end.'
          }
        ]
      },
      {
        version: 'V 2.3.5',
        date: '23/08/2019',
        description: 'En esta versión se agregan funcionalidades en:',
        descriptionItem: [
          {
            item: 'Select: Se define nuevo comportamiento visual. '
          },
          {
            item: 'Textfiled predictive:  Se define nuevo comportamiento visual.'
          },
          {
            item: 'se resuelve conflicto visual en textfield-password.'
          },
          {
            item: 'Control messages:  Se resuleve conficto visual con los textfield type password.'
          }
        ]
      },
      {
        version: 'V 2.1.0',
        date: '22/07/2019',
        description: 'En esta versión se agregan funcionalidades en:',
        descriptionItem: [
          {
            item: 'Snackbar: Nueovs inputs para mas comportamientos.'
          },
          {
            item: 'Textfield: Fix de textfield en writeValue.'
          },
          {
            item: 'Custom validators: Se implementa la validacion de email de angular.'
          },
          {
            item: 'Control messages: fix de error en mostrar icono cuando no validaba nada.'
          }
        ]
      },
      {
        version: 'V 2.0.0',
        date: '27/06/2019',
        description: 'En esta versión se agregan funcionalidades en:',
        descriptionItem: [
          {
            item: 'Message: Componente nuevo'
          },
          {
            item: 'Acordeon: Componente nuevo'
          },
          {
            item: 'Slider Control: Componente nuevo'
          },
          {
            item: 'Custom Validatios: Se disponibiliza para el uso de las validaciones'
          },
          {
            item: 'Container Icon: Se agrega OutPut para evento clic.'
          },
          {
            item: 'Snackbar: Se resuelve conflicto con evento.'
          },
          {
            item: 'Stuleguide: Disponibilizacion de nuevo archivo para landing page.'
          }
        ]
      },
      {
        version: 'V 1.2.0',
        date: '04/06/2019',
        description: 'En esta versión se agregan funcionalidades en:',
        descriptionItem: [
          {
            item: 'Avatar Pill: Componente nuevo'
          },
          {
            item: 'Snackbar: Se resuelven conflicto para identificacion de dispositivo.'
          },
          {
            item: 'Textfield: Se cambia de FormGroup a FormControl. '
          }
        ]
      },
      {
        version: 'V 1.1.4',
        date: '27/05/2019',
        description: `En esta versión se agregan funcionalidades en:`,
        descriptionItem: [
          {
            item: 'Tabs: isActive y isHidden'
          },
          {
            item: 'List: flexibilidad en contenido'
          }
        ]
      },
      {
        version: 'V 1.1.3',
        date: '21/05/2019',
        description: 'Se agregan eventos de salidas para validaciones\nCustom en Textfield e Input para ID del mismo.'
      }
    ];
  }
}
