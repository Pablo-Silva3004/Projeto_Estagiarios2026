import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        console.log('🔥 INTERCEPTOR EXECUTOU');
        console.log('URL:', req.url);

        const token = localStorage.getItem('token');

        console.log('TOKEN:', token);

        if (!token) {
            return next.handle(req);
        }

        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(authReq);
    }
}