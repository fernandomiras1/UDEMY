import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContactDetailResolverService implements Resolve<Contact> {
    constructor(
        private contactsService:ContactsService, 
        private router:Router
    ){ }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<Contact>{
        const id = Number(route.paramMap.get('id'));
        return this.contactsService.getContactById(id)
        .pipe(
            catchError(err => {
                this.router.navigate(['/not-found']);
                return EMPTY;
            })
        );
    }

}

