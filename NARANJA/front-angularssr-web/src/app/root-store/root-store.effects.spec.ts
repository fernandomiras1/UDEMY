import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/internal/Subject';
import { RootEffects } from './root-store.effects';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { NavigatorService } from '../core/utils/services/navigator.service';
import { WindowService } from '../core/utils/services/window.service';
class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({
    router: {},
  }));
  dispatch = jasmine.createSpy();
}
describe('Root Effects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Subject<any>;
  let _effects: RootEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        RootEffects,
        provideMockActions(() => actions$),
        { provide: Store, useClass: StoreMock },
        NavigatorService,
        WindowService,
      ],
    });

    _effects = TestBed.get(RootEffects);
  });
  it('should create rootStore', () => {
    actions$ = new ReplaySubject(1);
    actions$.next();
  });
});
