import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-title [title]="currentFramework()" />

    <pre> {{ frameworkAsSignal() | json }}</pre>
    <pre> {{ frameworkAsProperty | json }}</pre>
  `,
})
export default class ChangeDetectionComponent {
  readonly currentFramework = computed(
    () => `Change detection - ${this.frameworkAsSignal().name}`
  );

  readonly frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  });

  readonly frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016,
  };

  constructor() {
    setTimeout(() => {
      // this.frameworkAsProperty.name = 'React';
      this.frameworkAsSignal.update((currentValue) => ({
        ...currentValue,
        name: 'React',
      }));
      console.log('%c HECHO:', 'background: #222; color: #bada55');
    }, 3000);
  }
}
