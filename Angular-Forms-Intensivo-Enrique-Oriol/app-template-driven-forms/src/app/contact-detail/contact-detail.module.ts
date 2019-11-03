import { NgModule } from '@angular/core';
// te ayuda a usar la direciva ngModel y ngSubmite en el template
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContactDetailComponent } from './contact-detail.component';
import { ContactDetailShellComponent } from './contact-detail-shell/contact-detail-shell.component';
import { ContactDetailResolverService } from './contact-detail-resolver.service';
import { AuthGuard } from '../auth/auth.guard';
import { ContactFormComponent } from './contact-form/contact-form.component';
// Directive
import { StartsWithCapitalValidatorDirective } from '../directives/startsWithCapital.directive';

const contactDetailRoutes: Routes = [
    { path: 'contact-detail', component: ContactDetailShellComponent, data: {title: 'Contact detail'},
    children: [
      { path: '', component: ContactFormComponent },
      { path: ':id', component: ContactDetailComponent,
        resolve: { contact: ContactDetailResolverService }
      }
    ],
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(contactDetailRoutes)
    ],
    declarations: [
        ContactDetailComponent,
        ContactDetailShellComponent,
        ContactFormComponent,
        StartsWithCapitalValidatorDirective
    ]

})
export class ContactDetailModule { }
