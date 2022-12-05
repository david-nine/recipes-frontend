import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../entities/user/auth.service';

export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (this.authService.isLogged()) {
      headers = headers.append('Authorization', 'Bearer ' + this.authService.barerToken);
    }
    return next.handle(req.clone({headers: headers}));
  }
}
