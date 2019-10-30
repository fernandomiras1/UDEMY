import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZCardModule } from '../card/card.module';
import { NGZMessageComponent } from './message.component';

describe('NGZMesaggeComponent', () => {
  let component: NGZMessageComponent;
  let fixture: ComponentFixture<NGZMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZMessageComponent],
      imports: [NGZCardModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set type success', () => {
    component.type = 'success';
    expect(component.typeColor).toEqual('success');
  });

  it('should set type warning', () => {
    component.type = 'warning';
    expect(component.typeColor).toEqual('warning');
  });

  it('should set type error', () => {
    component.type = 'error';
    expect(component.typeColor).toEqual('error');
  });

  it('should set type default', () => {
    component.type = 'ersdf';
    expect(component.typeColor).toEqual('success');
  });

  it('should get class inexistent', () => {
    expect(component.getAlertClassBy('asd')).toEqual(null);
  });
});
