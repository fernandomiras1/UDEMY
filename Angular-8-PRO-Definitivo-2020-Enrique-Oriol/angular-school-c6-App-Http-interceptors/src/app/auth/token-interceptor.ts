import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
            // si existe el usuario
            if (this.auth.user) {
                // obtengo el token
                const token = this.auth.user.token;
                // header es inmutable no puedes modificarlo. por eso lo clonamos
                const authReq = req.clone({
                    setHeaders: { Authorization: `Bearer ${token}` }
                });
                // devolvemos la respuesta autorzada con el token agredado.
                return next.handle(authReq).pipe(
                    tap(event => console.log('RESPONSE DATA: ', event)),
                    // commented out (it modifies the response)
                    // map(event => {
                    //     if(event instanceof HttpResponse){
                    //         return event.clone({ body:[] })
                    //     }
                    // })
                );
            } else {
                // no hace nada> es la forma de pasar la cadena al siguente interceptor
                return next.handle(req);
            }
    }

}
