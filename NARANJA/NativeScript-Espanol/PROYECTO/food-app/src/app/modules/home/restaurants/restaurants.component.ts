import { Component } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { RestaurantService } from "./restaurants.service";

@Component({
    moduleId: module.id,
    templateUrl: "./restaurants.component.html",
    providers: [RestaurantService],
    styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent {
    public data: ObservableArray<any>;

    constructor(private restaurantService: RestaurantService) {
        this.data = new ObservableArray<any>([]);
        this.restaurantService.serach().subscribe(resu => {
           this.data.push(resu['restaurants']);
        }, error => console.log(error));
    }
}