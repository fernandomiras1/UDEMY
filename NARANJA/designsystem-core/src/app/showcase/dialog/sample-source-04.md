```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { ICustomDialogOptions, NGZCustomDialogService } from '../../../lib/src/components/custom-dialog';

@Component({
  selector: 'dsn-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class CustomDialogComponent implements OnInit {
  onCloseSubject = new Subject<any>();
  onCloseSubscription: Subscription;
  
  constructor(private customDialogService: NGZCustomDialogService) {
    
  }
  
  ngOnInit() {
     this.onCloseSubscription = this.onCloseSubject.asObservable()
       .subscribe((data) => {
         this.customDialogService.closeDialog();
     });
  }
  
   ngOnDestroy() {
      this.onCloseSubscription.unsubscribe();
   }
  
  openDialog(): void {
    const option: ICustomDialogOptions = {
          onActionClose: this.onCloseSubject
        };
    
    this.customDialogService.showDialog(PoliticaComponent, this.afterCloseSubject, option);
  }

}
```

