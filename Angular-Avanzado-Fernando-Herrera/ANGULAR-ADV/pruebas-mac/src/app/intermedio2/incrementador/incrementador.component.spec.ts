import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IncrementadorComponent } from './incrementador.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


describe('Incremendator Component', () => {

    let component: IncrementadorComponent;
    let fixture: ComponentFixture<IncrementadorComponent>;

    beforeEach( () => {
        TestBed.configureTestingModule({
            declarations: [ IncrementadorComponent ],
            imports: [ FormsModule ]
        });

        fixture = TestBed.createComponent(IncrementadorComponent);
        component = fixture.componentInstance;

    });

    it('Debe de mostrar la leyenda', () => {

      component.leyenda = 'Progreso de carga';
      // hay que disparar la deteccion de cambios de angular ya q vamos a modificar un elemento html y ts
      fixture.detectChanges();
      // referencia del html. By nos va ayudar a poder hacer selectores muy facilimente
      const elem: HTMLElement = fixture.debugElement.query( By.css('h3') ).nativeElement; // obtenemos el elemento html del h3
      expect( elem.innerText ).toContain('Progreso de carga');
    });

    it('Debe de mostar en el input el valor del progreso', () => {
      component.cambiarValor(5);
      fixture.detectChanges();
      // cuado ya termine la deteccin de cambios
      fixture.whenStable().then(() => {

        const input = fixture.debugElement.query(By.css('input'));
        const elem = input.nativeElement;

        expect( elem.value ).toBe('55');

      });
    })

    it('Debe de incremetar/decremetar en 5, con un click en el boton', () => {
      // selecionamos todos los botones del html
      const botones = fixture.debugElement.queryAll(By.css('.btn-primary'));
      console.log('botones', botones);
      // disparamos el clcik del boton
      botones[0].triggerEventHandler('click', null);
      expect(component.progreso).toBe(45); // debe ser de 45 porque comienza con 50 y restamos 5 ya que llamaos a este metodo cambiarValor(-5)

      botones[1].triggerEventHandler('click', null);
      expect(component.progreso).toBe(50); // debe ser de 45 porque comienza con 50 y restamos 5 ya que llamaos a este metodo cambiarValor(+5)
    });


    it('En el titulo del componente debe de mostrar el progreso', () => {

      const primerBoton = fixture.debugElement.query(By.css('.btn-primary'));
      primerBoton.triggerEventHandler('click', null);

      fixture.detectChanges();

      const elem: HTMLElement = fixture.debugElement.query( By.css('h3') ).nativeElement; // obtenemos el elemento html del h3
      expect( elem.innerText ).toContain('45');

    })


});
