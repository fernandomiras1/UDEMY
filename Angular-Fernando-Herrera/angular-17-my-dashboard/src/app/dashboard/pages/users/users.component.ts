import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [TitleComponent, RouterModule],
  templateUrl: './users.component.html',
  styles: ``,
})
export default class UsersComponent {
  readonly userService = inject(UsersService);
}
