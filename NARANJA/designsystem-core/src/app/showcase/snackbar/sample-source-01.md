```html
   <z-button (clickButton)="displaySnackbar()" [text]="'Mostrar Snackbar'"></z-button>
```
```typescript
import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISnackbarData, SnackbarService } from '../../../lib/src/components/snackbar/services/snackbar.service';

@Component({
  selector: 'z-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class NGZSnackbarComponent implements OnInit, OnDestroy {

  public eventSubject: Subject<any> = new Subject();
  public eventSubscription: Subscription;

   constructor(private snackService: SnackbarService) {}
  
    ngOnInit() {
  
      this.eventSubscription = this.eventSubject.asObservable().subscribe((event) => {
           if (event) {
             this.eventDemo();
           }
      });
    }
   
   ngOnDestroy(): void {
       this.eventSubscription.unsubscribe();
     }
   
   eventDemo() {
       window.location.reload();
     }
   
     displaySnackbar() {
       const dataSnackbar: ISnackbarData = {
         duration: 5,
         text: 'Sin conexión a internet.',
         eventName: 'Reintentar',
         onEvent: this.eventSubject,
         hasDuration: true
       };
   
       this.snackService.showSnackbar(dataSnackbar, this.eventSubject);
     }
}

```
