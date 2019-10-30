import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NGZContainerIconComponent } from './container-icon.component';
import { ZumoColors } from '../../utils/index';

describe('NGZIconContainerComponent', () => {
  let component: NGZContainerIconComponent;
  let fixture: ComponentFixture<NGZContainerIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZContainerIconComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZContainerIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and extra-larg size', () => {
    component.size = 'extra-large';
    expect(component.sizeIcon).toEqual('size-48');
  });

  it('should create and larg size', () => {
    component.size = 'large';
    expect(component.sizeIcon).toEqual('size-40');
  });

  it('should create and medium size', () => {
    component.size = 'medium';
    expect(component.sizeIcon).toEqual('size-32');
  });

  it('should create and small size', () => {
    component.size = 'small';
    expect(component.sizeIcon).toEqual('size-24');
  });

  it('should create and very-small size', () => {
    component.size = 'very-small';
    expect(component.sizeIcon).toEqual('size-24');
  });

  it('should create and default size', () => {
    component.size = 'ex';
    expect(component.sizeIcon).toEqual('size-48');
  });

  it('should create icon name check', () => {
    component.iconName = 'icon-check';
    expect(component.nameIcon).toEqual('icon-check');
  });

  it('should create icon name cross', () => {
    component.iconName = 'icon-cross';
    expect(component.nameIcon).toEqual('icon-cross');
  });

  it('should create icon name alert', () => {
    component.iconName = 'icon-alert';
    expect(component.nameIcon).toEqual('icon-alert');
  });

  it('should create icon name message', () => {
    component.iconName = 'icon-message';
    expect(component.nameIcon).toEqual('icon-message');
  });

  it('should create icon name user', () => {
    component.iconName = 'icon-user';
    expect(component.nameIcon).toEqual('icon-user');
  });

  it('should create icon name default', () => {
    component.iconName = 'icon-angle-right';
    expect(component.nameIcon).toEqual('icon-angle-right');
  });

  it('should create disabled component', () => {
    component.disabled = true;
    component.ngOnInit();
    expect(component.iconColor).toEqual(ZumoColors.Grayscale_400);
  });
});
