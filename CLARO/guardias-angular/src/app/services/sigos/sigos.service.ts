import { Injectable } from '@angular/core';
import { hasIntersection } from '@app/utils/intersection.array';
import { ProfileService } from '../profile.service';
import { SessionManagerService } from '../session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SigosService {

  constructor(private profileService:ProfileService) { }

  phoneNotValidated(): boolean
  {
    const sigos = SessionManagerService.getItem('phone-validation');

    if(sigos === '0') return false;

    const user = SessionManagerService.user();

    const roles = ['admin-guardia', 'admin-jefe-guardia', 'guardia'];

    if(hasIntersection(user.roles, roles))
      return this.profileService.isPhoneGuardValidated() ? false : true;
    else 
      return false;
  }
}
