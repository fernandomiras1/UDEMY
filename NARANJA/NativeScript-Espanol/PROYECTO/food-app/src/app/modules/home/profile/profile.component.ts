import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
    moduleId: module.id,
    templateUrl: "./profile.component.html",
    providers: [AuthService],
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    constructor(private page: Page, private route: RouterExtensions, private auth: AuthService) {
            // Quitamos el accionBar ( el borde blanco del header )
            this.page.actionBarHidden = true;
        }
        
    ngOnInit(): void {
    }

    public onLogout(): void {
        this.auth.deleteUser();
        this.route.navigate(['/'], { clearHistory: true});
    }

}