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
        const pub = 'public/';
        var nobearer: boolean = true;
        if(request.url.search('api/arrendero/registrar')!=-1 || request.url.search('api/arrendatario/registrar')!=-1){
            nobearer = false;
        }

        this.token = sessionStorage.getItem('sesion') || '';
        if(request.url.search(pub)==-1){
            if (request.url.search(re) == -1) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Basic ` + btoa('alquiler:alquilerPass')
                    }
                });
            } else {
                if(nobearer){
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${this.token}`
                        }
                    });
                }
            }
        } 
        return next.handle(request);
    }
}