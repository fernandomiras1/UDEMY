import { Component, Input } from "@angular/core";

@Component({
    selector: 'ns-bottomBar',
    moduleId: module.id,
    templateUrl: "./bottom-bar.component.html"
})
export class BottomBarComponent {

    @Input() index: number;
}