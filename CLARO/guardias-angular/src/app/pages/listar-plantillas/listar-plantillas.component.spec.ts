import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlantillasComponent } from './listar-plantillas.component';

describe('ListarPlantillasComponent', () => {
  let component: ListarPlantillasComponent;
  let fixture: ComponentFixture<ListarPlantillasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPlantillasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPlantillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
