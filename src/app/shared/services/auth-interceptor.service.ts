import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../entities/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLogged()) {
      const clonedReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/jso',
          'Authorization': 'Bearer ' + this.authService.barerToken
        })
      });
      return next.handle(clonedReq);
    } else {
      this.router.navigate(['expiredSession'])
    }
  }
}
