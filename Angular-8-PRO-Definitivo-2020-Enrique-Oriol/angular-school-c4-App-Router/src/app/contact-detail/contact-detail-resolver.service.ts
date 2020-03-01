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
      private contactsService: ContactsService,
      private router: Router
    ) { }
    // devuelve un Observable<Contact> de tipo Contacto por eso uamos el of y el EMPY ya que si o si tiene que devovler un observavle
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact> {
      // obtenemos el id paramMap del router
      const id = Number(route.paramMap.get('id'));
      const contact = this.contactsService.getContactById(id);
      if (contact) {
        // of: Generamos un observable con ese contenido.
        return of(contact);
      } else {
        this.router.navigate(['/not-found']);
        // si o si tenemos que devovler un Observable pero como neceistamos redireccionar al login.
        return EMPTY;
      }
    }

}
