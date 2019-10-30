
```typescript
  // Accion que se realiza luego del cierre del modal
  export interface ICustomDialogOptions {
    onActionClose: Subject<any>;
  }
  
  // Metodos

  // Permite la apertura del dialog
  showDialog(templateComponent: any, afterClose: Subject<any>, options?: ICustomDialogOptions);
  
  // Permite el cierre del dialog
  closeDialog(): void;
```
