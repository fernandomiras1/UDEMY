import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
// Module 
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CommonModule } from "@angular/common";

// Component
import { BottomBarComponent } from "./bottom-bar/bottom-bar.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";

const routes: Routes = [
    {
        path: 'restaurants',
        component: RestaurantsComponent
    }
]


@NgModule({
    imports: [
        CommonModule,
        NativeScriptRouterModule.forChild(routes)
    ],
    declarations: [
        BottomBarComponent,
        RestaurantsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class HomeModule { }
