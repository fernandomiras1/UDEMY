import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NGZLoadingComponent, LoadingType } from './loading.component';
import { ZUtilsModule } from '../../utils/utils.module';

describe('LoadingComponent', () => {
  let component: NGZLoadingComponent;
  let fixture: ComponentFixture<NGZLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NGZLoadingComponent
      ],
      imports : [
        ZUtilsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set Primary style default value', () => {
    expect(component.typeLoadingClass).toEqual('z-primary');
  });

  it('should set Secondary style', () => {
    component.type = 'secondary';
    expect(component.typeLoadingClass).toEqual('z-secondary');
  });

  it('should set Primary style when no type', () => {
    component.type = null;
    expect(component.typeLoadingClass).toEqual('z-primary');
  });
});
