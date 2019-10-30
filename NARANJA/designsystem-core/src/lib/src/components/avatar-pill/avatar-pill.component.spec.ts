import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NGZAvatarPillComponent } from './avatar-pill.component';

describe('NGZCardComponent', () => {
  let component: NGZAvatarPillComponent;
  let fixture: ComponentFixture<NGZAvatarPillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZAvatarPillComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZAvatarPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create and extra-larg size', () => {
    component.name = 'lucas';
    expect(component.name).toEqual('lucas');
  });
});
