import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarPlantillasComponent } from './listar-plantillas.component';

describe('ListarPlantillasComponent', () => {
  let component: ListarPlantillasComponent;
  let fixture: ComponentFixture<ListarPlantillasComponent>;

  beforeEach(waitForAsync(() => {
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
