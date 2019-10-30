import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NGZAvatarComponent } from './avatar.component';

describe('NGZCardComponent', () => {
  let component: NGZAvatarComponent;
  let fixture: ComponentFixture<NGZAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZAvatarComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create and extra-larg size', () => {
    component.size = 'extra-large';
    expect(component.sizeIcon).toEqual('size-32');
  });

  it('should create and larg size', () => {
    component.size = 'large';
    expect(component.sizeIcon).toEqual('size-24');
  });

  it('should create and medium size', () => {
    component.size = 'medium';
    expect(component.sizeIcon).toEqual('size-16');
  });

  it('should create and small size', () => {
    component.size = 'small';
    expect(component.sizeIcon).toEqual('size-12');
  });

  it('should create and default size', () => {
    component.size = 'default';
    expect(component.sizeIcon).toEqual('size-32');
  });

  it('should create and extra-larg size', () => {
    component.size = 'extra-large';
    expect(component.sizeIcon).toEqual('size-32');
  });

  it('should create and backgroundColor', () => {
    component.initials = 'K';
    expect(component.backgroundColor).not.toEqual(null);
  });

  it('should create and backgroundColor when is OnInit', () => {
    component.initials = 'K';
    component.ngOnInit();
    expect(component.backgroundColor).not.toEqual(null);
  });
});
