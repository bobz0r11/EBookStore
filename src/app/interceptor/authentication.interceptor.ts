import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const isLoggedIn = localStorage.getItem('currentUser');

        return of(null).pipe(mergeMap(() => {
            //Skip the request interception check if user exists in DB
            if (request.url.includes("register") && request.method == 'GET') {
                return next.handle(request);
            }

            if (request.url.endsWith('/login/authenticate') && request.method === 'POST') {
                return ok({
                    token: `AUTH-TOKEN`,
                    name: request.body.username
                });
            } else {
                if (!isLoggedIn) {
                    return unauthorised();
                }
            }
            return next.handle(request);
        }))
            .pipe(materialize())
            .pipe(dematerialize());

        // private helper functions
        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
    }
}

export let authenticationProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
};