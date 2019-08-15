import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor (private auth: AuthService, private route: RouterExtensions) {}

    canActivate() {
        if (this.auth.currentUser() === null ) {
            return true;
        }

        this.route.navigate(['/home/restaurants']);
        return false;
    }

}