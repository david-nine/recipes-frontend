import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  private currentUserId: number;
  private token: string;

  constructor(
    private http: HttpClient
  ) { }

  public logIn(user: string, password: string): Observable<{accessToken: string, userId: number}> {
    return this.http.post<{accessToken: string, userId: number}>('login', { login: user, password: password })
      .pipe(
        tap(data => {
          this.currentUserId = data.userId;
          this.token = data.accessToken;
        })
      );
  }

  public logOut() {
    this.token = null;
    this.currentUserId = null;
  }

  public isLogged() {
    return !!this.barerToken;
  }

  get barerToken(): string {
    return this.token;
  }

}
