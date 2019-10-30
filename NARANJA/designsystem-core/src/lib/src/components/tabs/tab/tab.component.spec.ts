import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZTabComponent } from './tab.component';
import { ZRippleEffectDirective } from '../../../utils/directives/ripple-effect/ripple-effect.directive';

describe('TabComponent', () => {
  let component: NGZTabComponent;
  let fixture: ComponentFixture<NGZTabComponent>;

  const tabAux = { active: true, disabled: false, title: '' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZTabComponent, ZRippleEffectDirective]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
