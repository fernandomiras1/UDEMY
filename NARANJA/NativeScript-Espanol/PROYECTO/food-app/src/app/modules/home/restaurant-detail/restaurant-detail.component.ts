import { Component, OnInit } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Page } from "tns-core-modules/ui/page/page";
import { ActivatedRoute } from "@angular/router";
import { MapboxViewApi } from 'nativescript-mapbox';
@Component({
    moduleId: module.id,
    templateUrl: "./restaurant-detail.component.html",
    providers: [],
    styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {
    public data: ObservableArray<any>;
    public restaurant: any;
    private map: MapboxViewApi;
    constructor(private page: Page, private params: ActivatedRoute) {
            // Quitamos el accionBar ( el borde blanco del header )
            this.page.actionBarHidden = true;
            this.restaurant = JSON.parse(this.params.snapshot.queryParams['restaurant']).restaurant;
        }
        
    ngOnInit(): void {
    }

    public onMapReady(args, restaurant): void {
        this.map = args.map;
        // Agregamos el marcador
        this.map.addMarkers([
            {
                lat: restaurant.location.latitude,
                lng: restaurant.location.longitude,
                title: restaurant.name,
                subtitle: restaurant.timings
            }
        ]);
    }
}