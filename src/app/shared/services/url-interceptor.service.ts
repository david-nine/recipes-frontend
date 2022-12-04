import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class URLInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const clonedReq = req.clone({
            url: environment.base_url + req.url
        });
        return next.handle(clonedReq);
    }
}