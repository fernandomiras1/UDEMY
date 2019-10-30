import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { NGZTabComponent } from './tab/tab.component';
import { NGZTabsComponent } from './tabs.component';
import { ZRippleEffectDirective } from '../../utils/directives/ripple-effect/ripple-effect.directive';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Component } from '@angular/core';

@Component({
  template: `
  <z-tabs>
    <z-tab title="Montos a pagar">
        <label>prueba</label>
    </z-tab>
    <z-tab title="Disponibles" id="clicEvent" [isActive]="true">
        <label>prueba</label>
    </z-tab>
    <z-tab title="Consumos" [disabled]="true">
        <label>prueba</label>
    </z-tab>
  </z-tabs>`
})
class TabsTestComponent {
}

describe('TabsComponent', () => {
  let component: TabsTestComponent;
  let fixture: ComponentFixture<TabsTestComponent>;
  let el;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsTestComponent, NGZTabsComponent, NGZTabComponent, ZRippleEffectDirective],
      imports: [],
      providers: [DeviceDetectorService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click inside the div and return a null value', fakeAsync(() => {
    fixture.detectChanges();
    const div = el.querySelector('#clicEvent');
    div.click();
    fixture.detectChanges();
  }));
});
