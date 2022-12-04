import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserData;
  private token;

  constructor() { }

  public logIn(user: string, password: string): Observable<any> {
    console.log('user: ' + user + 'password: ' + password);
    const subject = new Subject();
    setTimeout( () => subject.next(true), 1000);
    return subject;
  }

  public logOut() {

  }

  public isLogged() {
    return false;
  }

  get barerToken(): string {
    return this.token;
  }

}
