import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoComponent } from './demo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TranslateTestingModule } from '../../../../test/utils/translate-mock.service';
import { SharedModule } from '@shared/shared.module';
import { WindowService } from '../../core/utils/services/window.service';

describe('AboutComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestingModule,
        SharedModule,
      ],
      declarations: [
        DemoComponent,
      ],
      providers: [
        WindowService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
