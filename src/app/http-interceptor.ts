import { Injectable } from '@angular/core';

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
declare var localStorage: any;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let allowedUrls = (request.url.indexOf("api/token/login") < 0);

        if (allowedUrls) {

            let authToken = localStorage.getItem("token");
            request = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + authToken)
            });
        }
        return next.handle(request);
    }
}