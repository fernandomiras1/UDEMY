import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
// Module 
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Component
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

// service
import { AuthGuard } from "./guard.service";
import { AuthService } from "./auth.service";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    }
]


@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes),
        NativeScriptFormsModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AuthGuard,
        AuthService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AuthModule { }
