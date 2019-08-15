import { Component } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { AuthService } from "../auth.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent {
    public email = 'eve.holt@reqres.in';
    public password = 'pistol';

    constructor(private page: Page, private auth: AuthService, private router: RouterExtensions) {
        // Quitamos el accionBar ( el borde blanco del header )
        this.page.actionBarHidden = true;
    }

    public onLogin(): void {
        this.auth.login(this.email, this.password).subscribe((resu: any) => {
            // lo guardmaos en el localStrogage
            this.auth.setUser(resu);
            this.router.navigate(['/home/restaurants'], { clearHistory: true });
        }, error => console.log(error));
    }
}