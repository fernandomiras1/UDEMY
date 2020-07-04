import { TestBed, async, ComponentFixture, inject, tick } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { ZumoModule } from 'zumo';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { TranslateTestingModule } from '../../../../test/utils/translate-mock.service';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotFoundComponent,
      ],
      imports: [
        HttpClientModule,
        ZumoModule,
        TranslateTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(inject([], () => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
