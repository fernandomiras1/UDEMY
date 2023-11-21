import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heavy-loaders-slow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section [ngClass]="['w-full h-[600px]', cssClass]">
      Heavy Loader Slow
    </section>
  `,
})
export class HeavyLoadersSlowComponent {
  @Input({ required: true }) cssClass!: string;

  constructor() {
    const start = Date.now();
    // Va a bloquear javascirpt ( SIMULATION: es un Componente MUY PESADO )
    while (Date.now() - start < 3000) {
      console.log('%c CARGANDO !!!!!:', 'background: #222; color:red');
    }

    console.log('\x1b[32m%s\x1b[0m', 'CARGADO:');
  }
}
