import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetalleGrupoComponent } from './detalle-grupo.component';

describe('DetalleGrupoComponent', () => {
  let component: DetalleGrupoComponent;
  let fixture: ComponentFixture<DetalleGrupoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
