import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
// Module
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CommonModule } from "@angular/common";
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular/listview-directives';

// Component
import { BottomBarComponent } from "./bottom-bar/bottom-bar.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
// Plugin
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { ProfileComponent } from "./profile/profile.component";
import { MenuComponent } from "./menu/menu.component";
registerElement('CardView', () => CardView);
registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

const routes: Routes = [
    {
        path: 'restaurants',
        component: RestaurantsComponent
    },
    {
        path: 'restaurant-detail',
        component: RestaurantDetailComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'menu',
        component: MenuComponent
    }
]


@NgModule({
    imports: [
        CommonModule,
        NativeScriptUIListViewModule,
        NativeScriptRouterModule.forChild(routes)
    ],
    declarations: [
        BottomBarComponent,
        RestaurantsComponent,
        RestaurantDetailComponent,
        ProfileComponent,
        MenuComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class HomeModule { }
