import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(public generalservice: GeneralService, private router: Router) { 

  }
  
  async has(roles: string []): Promise<boolean>{
    if(this.router.url !== '/login') {
      const user = await this.generalservice.getUser();
      const role = await user.role;
      return roles.includes(role);
    }
  }
  async exceptions(roles: string []): Promise<boolean>{
    if(this.router.url !== '/login') {
      const user = await this.generalservice.getUser();
      const role = await user.role;
      return roles.includes(role) ? false : true;
    }
  }
}
