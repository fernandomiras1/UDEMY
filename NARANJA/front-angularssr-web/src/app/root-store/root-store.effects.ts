
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { NavigatorService } from '../core/utils/services/navigator.service';
@Injectable()
export class RootEffects {

  constructor(
    private actions$: Actions,
    private _navigatorService: NavigatorService,
  ) { }
}
