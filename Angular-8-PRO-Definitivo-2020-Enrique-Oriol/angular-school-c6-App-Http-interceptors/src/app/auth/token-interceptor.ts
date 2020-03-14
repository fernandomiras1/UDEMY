import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map } from 'rxjs/operators';



@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    
    constructor(private auth:AuthService){ }
    
    intercept(req:HttpRequest<any>, next:HttpHandler):
        Observable<HttpEvent<any>>{
            if(this.auth.user){
                const token = this.auth.user.token;
                const authReq = req.clone({ 
                    setHeaders: { Authorization:`Bearer ${token}` }
                });
                return next.handle(authReq).pipe(
                    tap(event => console.log("RESPONSE DATA: ", event)),
                    // commented out (it modifies the response)
                    // map(event => {
                    //     if(event instanceof HttpResponse){
                    //         return event.clone({ body:[] })
                    //     }
                    // })
                );
            }
            else{
                return next.handle(req);
            }
    }

}