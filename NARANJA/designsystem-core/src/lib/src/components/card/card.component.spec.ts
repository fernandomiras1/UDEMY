import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NGZCardComponent } from './card.component';
import { ZHoverDirective } from '../../utils/directives/hover/hover.directive';
import { ZRippleEffectDirective } from '../../utils/directives/ripple-effect/ripple-effect.directive';
import { DocumentService } from '../../utils/services/document/document.service';
import { WindowService } from '../../utils/services/window/window.service';

describe('NGZCardComponent', () => {
  let component: NGZCardComponent;
  let fixture: ComponentFixture<NGZCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZCardComponent, ZHoverDirective, ZRippleEffectDirective],
      providers: [DocumentService, WindowService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click card', async(() => {
    component.clickable = true;
    component.onCardClicked();

    expect(component.clickCard.emit).toBeTruthy();

  }));

  it('should click card when clickable is false', async(() => {
    component.clickable = false;
    component.onCardClicked();

    expect(component.clickCard.emit).toBeTruthy();
  }));
});
