import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZButtonComponent, ButtonComponentType } from './button.component';
import { NGZLoadingModule } from '../loading/loading.module';

describe('ButtonComponent', () => {
  let component: NGZButtonComponent;
  let fixture: ComponentFixture<NGZButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NGZButtonComponent
      ],
      imports: [
        NGZLoadingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set Primary style default value', () => {
    expect(component.typeButtonClass).toEqual('z-btn-primary');
    expect(component.disabled).toEqual(false);
  });

  it('should set Link style default value', () => {
    component.type = ButtonComponentType.LINK;
    expect(component.typeButtonClass).toEqual('z-btn-link');
  });

  it('should set Primary style', () => {
    component.type = ButtonComponentType.PRIMARY;
    expect(component.typeButtonClass).toEqual('z-btn-primary');
    expect(component.disabled).toEqual(false);
  });

  it('should set Secondary style', () => {
    component.type = ButtonComponentType.SECONDARY;
    expect(component.typeButtonClass).toEqual('z-btn-secondary');
    expect(component.disabled).toEqual(false);
  });

  it('button component should have one class', () => {
    component.type = ButtonComponentType.STICKY;
    expect(component.typeButtonClass).toEqual('z-btn-sticky');
  });

  it('button component should be enabled', () => {
    component.type = ButtonComponentType.STICKY;
    expect(component.disabled).toEqual(false);
  });

  it('should set Primary style when no type', () => {
    component.type = null;
    expect(component.typeButtonClass).toEqual('z-btn-primary');
    expect(component.disabled).toEqual(false);
  });

  it('should click button', async(() => {
    component.onButtonClicked();

    expect(component.clickButton.emit).toBeTruthy();
  }));

  it('should click button when is disabled', async(() => {
    component.disabled = true;
    component.onButtonClicked();

    expect(component.clickButton.emit).toBeTruthy();
  }));
});
