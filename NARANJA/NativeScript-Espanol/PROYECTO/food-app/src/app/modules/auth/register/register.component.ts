import { Component } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { AuthService } from "../auth.service";
import { RouterExtensions } from "nativescript-angular/router";
import * as firebase from 'nativescript-plugin-firebase';
@Component({
    moduleId: module.id,
    templateUrl: "./register.component.html"
})
export class RegisterComponent {
    public email = 'eve.holt@reqres.in';
    public password = 'pistol';
    constructor(private page: Page, private auth: AuthService, private router: RouterExtensions) {
        // Quitamos el accionBar ( el borde blanco del header )
        this.page.actionBarHidden = true;
    }

    public onRegister(): void {
        this.auth.register(this.email, this.password).subscribe(resu => {
            console.dir(resu);
            this.router.navigate(['/home/restaurants'], { clearHistory: true });
        }, error => console.log(error));
    }

    public onLoginFacebook(): void {
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            facebookOptions: {
                // Que informacion queremos traer
                scopes: ['public_profile', 'email']
            }
        }).then(resu => {
            console.dir(JSON.stringify(resu));
            this.auth.setUser(JSON.stringify(resu));
            this.router.navigate(['/home/restaurants'], { clearHistory: true });
        }, error => console.log)
        
    }
}