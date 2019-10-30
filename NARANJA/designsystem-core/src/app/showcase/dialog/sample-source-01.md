
```typescript
  // Icono a utilizar
  export interface IContainerIconData {
    iconName?: string;
  }
  
  //  Interfaz de datos con que se maneja el servicio del dialog.
  export interface IDialogData {
    contentIcon?: IContainerIconData;
    title?: string;
    paragraph?: string;
    disabledClose?: boolean;
    actionsButtons?: IModalDialogButton[];
    onAction?: Subject<any>;
  }
 
  //  Interfaz de los botones del dialog.
  export interface IModalDialogButton {
    text: string;
    onAction?: Subject<any>;
    actionsButtons?: boolean;
    data?: any;
  }
  
  // Tipos de iconos mas utilizados
  export const ContentIconsType = {
    WARNING: 'icon-message',
    ERROR: 'icon-cross',
    SUCCESS: 'icon-check'
  };

  // Metodos

  // Permite la apertura del dialog
  showDialog(dataComponent: IDialogData, afterClose: Subject<any>): void;
  
   // Permite el cierre del dialog
  closeDialog(): void;
```
