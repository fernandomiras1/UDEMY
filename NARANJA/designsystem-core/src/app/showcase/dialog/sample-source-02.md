```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { ContentIconsType, IDialogData, NGZDialogService } from '../../../lib/src/components/dialog';

@Component({
  selector: 'dsn-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  afterCloseSubject = new Subject();

  // en el caso que se desee usar el mismo subjet
  afterCloseSubjectGeneric = new Subject();

  public onActionAfterClose$: Observable<any>;  
  public onActionSubscription: Subscription;
  
  constructor(private dialogService: NGZDialogService) {
    
  }
  
  ngOnInit() {
  
    this.onActionAfterClose$ = this.afterCloseSubject.asObservable();
    this.onActionSubscription = this.onActionAfterClose$.subscribe(() => {
      this.dialogService.closeDialog();
    });

    this.afterCloseSubjectGeneric.asObservable().subscribe((data) => {
      console.log(data);
    });

  }
  
  openDialog(): void {
    const dialogData: IDialogData = {
      contentIcon: {
        iconName: 'icon-message'
      },
      actionsButtons: [
        {
          text: 'Ahora no',
          onAction: this.afterCloseSubject,
          data: {
            // agregar toda la informacion necesaria para identificar
            // el boton que fue presionado. 
            // id: 1
          }
        },
        {
          text: 'Permitir',
          onAction: this.afterCloseSubject,
          data: {
            // agregar toda la informacion necesaria para identificar
            // el boton que fue presionado. 
            // id: 2
          }
        }
      ],
      title: 'Acceso a contactos',
      onAction: this.afterCloseSubjectGeneric,
      paragraph: 'Permitir que Naranja pueda tener acceso a mis contactos.'
    };

    this.dialogService.showDialog(dialogData, this.afterCloseSubject);
  }

}
```
