import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZChipComponent } from './chip.component';
import { FormsModule } from '@angular/forms';
import { ZRippleEffectDirective } from '../../../utils/directives/ripple-effect/ripple-effect.directive';
import { DocumentService } from '../../../utils/services/document/document.service';
import { WindowService } from '../../../utils/services/window/window.service';

describe('ChipComponent', () => {
  let component: NGZChipComponent;
  let fixture: ComponentFixture<NGZChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZChipComponent, ZRippleEffectDirective],
      imports: [FormsModule],
      providers: [DocumentService, WindowService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should checkChip', () => {
    component.checkChip();

    expect(component.chipSelected).toBeTruthy();
  });

  it('should checkChip when isRadio is true', () => {
    component.isRadio = true;
    component.checkChip();

    expect(component.chipSelected).toBeTruthy();
  });
});
