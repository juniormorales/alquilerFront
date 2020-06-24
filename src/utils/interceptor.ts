import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
    constructor() { }

    token: string;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpEvent<any>> {
        const re = 'api/';
        this.token = sessionStorage.getItem('sesion') || '';
        if (request.url.search(re) == -1) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ` + btoa('alquiler:alquilerPass')
                }
            });
        } else {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
        }
        return next.handle(request);
    }
}