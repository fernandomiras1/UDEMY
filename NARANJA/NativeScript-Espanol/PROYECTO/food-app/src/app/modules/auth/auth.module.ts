import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
// Module 
import { NativeScriptRouterModule } from "nativescript-angular/router";

// Component
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
]


@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes)
    ],
    declarations: [
        LoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AuthModule { }
