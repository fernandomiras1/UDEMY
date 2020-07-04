import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[appRbacAllow]',
})
export class AppRbacAllowDirective implements OnDestroy {

  allowedRoles: string[];
  user: any;

  sub: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private _authService: AuthenticationService,
  ) {
    this.sub = this._authService.userProfile$.subscribe(
      (user) => {
        this.user = user;
        this.showIfUserAllowed();
      },
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @Input()
    set appRbacAllow(allowedRoles: string[]) {
      this.allowedRoles = allowedRoles;
      this.showIfUserAllowed();
    }

  showIfUserAllowed() {
    if (
      !this.allowedRoles ||
      this.allowedRoles.length === 0 ||
      !this.user
    ) {
      this.viewContainer.clear();
      return;
    }

    const isUserAllowed = _.intersection(this.allowedRoles, this.user.roles).length > 0;

    if (isUserAllowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }

  }

}
