import { Component, OnInit } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { RestaurantService } from "./restaurants.service";
import { Page } from "tns-core-modules/ui/page/page";
import { TextField } from 'tns-core-modules/ui/text-field';
@Component({
    moduleId: module.id,
    templateUrl: "./restaurants.component.html",
    providers: [RestaurantService],
    styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
    public data: ObservableArray<any>;
    
    constructor(private restaurantService: RestaurantService, private page: Page) {
            // Quitamos el accionBar ( el borde blanco del header )
            this.page.actionBarHidden = true;
        }
        
    ngOnInit(): void {
        this.getRestaurants();
    }


    public getRestaurants(query: string = '') {
        this.data = new ObservableArray<any>([]);
        this.restaurantService.serach(query).subscribe(resu => {
            this.data.push(resu['restaurants']);
         }, error => console.log(error));
    }

    public onReturnPress(args) {
        let textField = <TextField>args.object;
        // Accedemos al texto. textField.text;
        this.getRestaurants(textField.text);
    }
}