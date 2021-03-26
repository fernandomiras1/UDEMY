import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NuevoGrupoComponent } from './nuevo-grupo.component';

describe('NuevoGrupoComponent', () => {
  let component: NuevoGrupoComponent;
  let fixture: ComponentFixture<NuevoGrupoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
