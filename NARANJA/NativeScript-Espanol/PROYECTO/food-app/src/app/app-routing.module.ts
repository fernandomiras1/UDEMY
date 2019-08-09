import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

const routes: Routes = [
    { 
        path: '',
        loadChildren: './modules/auth/auth.module#AuthModule'
    },
    {
        path: 'home',
        loadChildren: './modules/home/home.module#HomeModule'
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
