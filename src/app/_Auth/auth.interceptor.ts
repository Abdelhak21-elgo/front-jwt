import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { UserAuthService } from "../_Services/user-auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userAuthServce: UserAuthService,
        private router: Router) { }
    intercept(req: HttpRequest<any>,
        next: HttpHandler):
        Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }
        const Token = this.userAuthServce.getToken();

        if(Token) req = this.addToken(req, Token);
        
        return next.handle(req).pipe(
            catchError(
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    if (err.status === 401) {
                        this.router.navigate(['/Login']);
                    } else if (err.status === 403) {
                        this.router.navigate(['/Forbidden']);
                    }
                    return throwError("Some thing is wrong");
                }
            )
        );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone(
            {
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }

}