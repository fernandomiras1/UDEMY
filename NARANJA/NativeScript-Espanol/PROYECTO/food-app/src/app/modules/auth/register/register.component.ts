import { Component } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    moduleId: module.id,
    templateUrl: "./register.component.html"
})
export class RegisterComponent {
    constructor(private page: Page) {
        // Quitamos el accionBar ( el borde blanco del header )
        this.page.actionBarHidden = true;
    }
}