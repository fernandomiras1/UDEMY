import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';
type Grade = 'A' | 'B' | 'F';
@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './control-flow.component.html',
})
export default class ControlFlowComponent {
  readonly showContent = signal(false);
  readonly grade = signal<Grade>('A');
  readonly frameworks = signal(['Angular', 'Vue', 'Svelte', 'Qwik', 'React']);
  readonly frameworks2 = signal([]);

  toggleContent() {
    this.showContent.update((currentValue) => !currentValue);
  }
}
