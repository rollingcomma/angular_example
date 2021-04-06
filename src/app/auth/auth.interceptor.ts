import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = localStorage.getItem('token');
        if( token != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });
            return next.handle(clonedReq).pipe(
                tap(
                    success => {},
                    err => {
                        if(err.status == 401){
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/login');
                        } else if(err.status == 403) {
                            this.router.navigateByUrl('/forbidden');
                        }
                    }
                )
            )
        } else {
            return next.handle(req.clone());
        }

    }
}