import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    moduleId: module.id,
    templateUrl: "./profile.component.html",
    providers: [],
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    constructor(private page: Page) {
            // Quitamos el accionBar ( el borde blanco del header )
            this.page.actionBarHidden = true;
        }
        
    ngOnInit(): void {
    }

}