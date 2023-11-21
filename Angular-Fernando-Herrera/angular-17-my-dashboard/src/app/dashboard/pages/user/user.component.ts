import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleComponent } from '@shared/title/title.component';
import { User } from '../../../interfaces/req-response';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { UsersService } from '@services/users.service';
@Component({
  standalone: true,
  imports: [TitleComponent],
  template: `
    <app-title [title]="titleLabel()" />

    @if( user()) {

    <section>
      <img [srcset]="user()!.avatar" />
      <div>
        <h3>{{ user()?.first_name }} {{ user()?.last_name }}</h3>
        <p>{{ user()?.email }}</p>
      </div>
    </section>

    } @else {
    <p>Cargando</p>
    }
  `,
})
export default class UserComponent {
  readonly route = inject(ActivatedRoute);
  readonly userService = inject(UsersService);
  // readonly user = signal<User | undefined>(undefined);
  // toSignal: Lo que me permite es agragar un Observable y regresar una senal
  readonly user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.userService.getUserById(id))
    )
  );

  readonly titleLabel = computed(() => {
    return this.user()
      ? `Informacion del usuario ${this.user()?.first_name} ${
          this.user()?.last_name
        }`
      : 'Informacion del usuario';
  });
}
