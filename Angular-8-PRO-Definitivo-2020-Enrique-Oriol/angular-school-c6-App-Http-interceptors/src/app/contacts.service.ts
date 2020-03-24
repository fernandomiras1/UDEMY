import { Injectable } from '@angular/core';
import { Contact, PhoneType} from './contact.model';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    private resourceUrl = environment.apiUrl + '/contacts';

    constructor(private http: HttpClient, private auth: AuthService) {
    }

    getContacts() {
        return this.http.get<Contact[]>(this.resourceUrl);
    }

    getContactById(id) {
        return this.http.get<Contact>(`${this.resourceUrl}/${id}`);
    }

    public addContact(contact: Contact) {
        // una vez q agregamos el contacto, sumimos la foto
        return this.http.post(this.resourceUrl, contact).pipe(
            // usamos mergeMap: porq permite lanzar un nuevo obsevavle en el interior de otro observavle. y subscribice al resultado
            mergeMap((res: Contact) => this.updateContactImage(res, contact.pictureFile))
        );
    }

    public updateContact(contact: Contact) {
        // put: reemplaza el objeto completo por el que le pasas.
        // patch: solo reemplaza los campos que les envias, mientras q el restro los maniene
        return this.http.patch(`${this.resourceUrl}/${contact.id}`, contact).pipe(
            mergeMap( (res: Contact) => this.updateContactImage(res, contact.pictureFile))
        );
    }

    // permite subir la imagen por separado sacandolo en base 64 y pasando a un path donde se va alojar la imagen en el srv
    private updateContactImage(contact: Contact, file: File) {
        if (!file) {
            return of(contact);
        }
        const formData = new FormData();
        formData.append('picture', file, file.name);
        return this.http.patch(`${this.resourceUrl}/${contact.id}`, formData);
    }

    public removeContact(contact: Contact) {
        return this.http.delete(`${this.resourceUrl}/${contact.id}`);
    }

}
