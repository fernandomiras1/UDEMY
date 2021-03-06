import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GeneralService } from '@app/services/general.service';
import { ROLE } from '@app/utils/common.enum';
import { USER_PROFILE } from '@app/utils/common.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(private generalService: GeneralService,
              private router: Router) {}

  canActivate(): boolean {
    const user = this.generalService.getUser();
    if (user.roles.includes(USER_PROFILE.ADMIN)) {
      return true;
    }

    this.router.navigate(['home']);
    return false;
  }

}
