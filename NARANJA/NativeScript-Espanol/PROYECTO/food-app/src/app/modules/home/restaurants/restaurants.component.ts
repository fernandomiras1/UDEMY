import { Component } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

@Component({
    moduleId: module.id,
    templateUrl: "./restaurants.component.html",
    styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent {
    public data: ObservableArray<any>;

    constructor() {
        this.data = new ObservableArray<any>([]);
        this.data.push([
            {
                nombre: 'Alan',
                color: 'rojo'
            },
            {
                nombre: 'Alan 1',
                color: 'rojo'
            },
            {
                nombre: 'Alan 2',
                color: 'rojo'
            },
            {
                nombre: 'Alan 3',
                color: 'rojo'
            },
            {
                nombre: 'Alan 4',
                color: 'rojo'
            }
        ]);
    }
}