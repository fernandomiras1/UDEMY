import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay, map } from 'rxjs';
import { User, UserResponse, UsersResponse } from '../interfaces/req-response';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly http = inject(HttpClient);

  // Numeral: Lo hace privado
  #state = signal<State>({
    loading: true,
    users: [],
  });

  // Usamos Senales computadas de solo lectura ( No se puede cambiar )
  readonly users = computed(() => this.#state().users);
  readonly loading = computed(() => this.#state().loading);

  constructor() {
    this.http
      .get<UsersResponse>('https://reqres.in/api/users')
      .pipe(delay(1500))
      .subscribe((res) => {
        this.#state.set({
          loading: false,
          users: res.data,
        });
      });
  }

  getUserById(id: string) {
    return this.http
      .get<UserResponse>(`https://reqres.in/api/users/${id}`)
      .pipe(
        delay(1500),
        map((resp) => resp.data)
      );
  }
}
