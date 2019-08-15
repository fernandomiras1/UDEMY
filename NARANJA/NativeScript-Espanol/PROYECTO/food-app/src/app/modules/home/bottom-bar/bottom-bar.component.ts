import { Component, Input } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: 'ns-bottomBar',
    moduleId: module.id,
    templateUrl: "./bottom-bar.component.html"
})
export class BottomBarComponent {

    @Input() index: number;

    constructor(private router: RouterExtensions) {}
    
    public onNavigate(url: string) {
        this.router.navigate([url], {
            // Para que no guarde la navegacion
            clearHistory: true,
            animated: false
        });
    }
}