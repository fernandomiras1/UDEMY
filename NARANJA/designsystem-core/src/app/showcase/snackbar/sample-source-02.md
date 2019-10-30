
```typescript
  export interface ISnackbarData {
    text?: string;
    eventName?: string;
    isHiddenButton?: boolean;
    duration?: number;
    onEvent?: any;
    hasDuration?: boolean;
  }

  // Metodos

  // Permite la apertura del snackbar
  showSnackbar(dataComponent: ISnackbarData, afterClose?: Subject<any>)
  
   // Permite el cierre del snackbar
   closeSnackbar()
```
