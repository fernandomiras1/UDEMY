import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { of, EMPTY, Observable } from 'rxjs';

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
        const contact = this.contactsService.getContactById(id);

        if(contact){
            return of(contact);
        }else{
            this.router.navigate(['/not-found']);
            return EMPTY;
        }
    }

}

