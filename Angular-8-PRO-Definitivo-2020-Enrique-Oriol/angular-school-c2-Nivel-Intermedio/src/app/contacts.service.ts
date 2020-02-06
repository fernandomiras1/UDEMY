import { Injectable } from '@angular/core';
import { Contact, PhoneType} from './contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    constructor() { }

    getContacts(){
        return [
            new Contact(1, "Albert", "assets/default-user.png", [
                {type:PhoneType.work, number:93200621621 },
                {type:PhoneType.home, number:93444001100 },
                {type:PhoneType.mobile, number:629304050 } 
            ], "albert@email.com", "Villaroel 52, 08027, Barcelona" ), 
            new Contact(2, "Beckie", "assets/default-user.png", [ 
                { type:PhoneType.mobile, number:111223344 }
            ] ),
            new Contact(3, "Johan", "assets/default-user.png", [
                {type:PhoneType.home, number:123456789 },
                {type:PhoneType.mobile, number:111111122 } 
            ], "johan@email.com", "Raval 7, 08020, Barcelona" ),
            new Contact(4, "Martin", "assets/default-user.png", [
                {type:PhoneType.work, number:222334455 },
                {type:PhoneType.mobile, number:222222222 } 
            ], "martin@email.com", "Boquería 12, 08021, Barcelona" ),
            new Contact(5, "Samantha", "assets/default-user.png", [
                {type:PhoneType.work, number:931224455 },
                {type:PhoneType.home, number:934122233 },
                {type:PhoneType.mobile, number:662113344 } 
            ], "samantha@email.com", "Plaza Pau Vila 1, 08039, Barcelona" ),  
            new Contact(6, "Kaycee", "assets/default-user.png", [
                {type:PhoneType.mobile, number:939876655 },
            ], "kaycee@email.com", "Arago 356, 08032, Barcelona" ),                        
        ]
    }

}