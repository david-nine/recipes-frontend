import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseEntityService<T> {

  protected constructor(
    protected http: HttpClient,
    protected entityName: string
  ) {
  }

  get(id: string) {
    return this.http.get(`${this.entityName}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        throw err;
      })
    );
  }

  private fakeObservable() {
    const subject = new Subject();
    setTimeout(() => {
      subject.next({id: 1});
    }, 1000);
    return subject.asObservable();
  }

  post(dto: T) {
    return this.http.post(`${this.entityName}/0`, dto);
  }

  put(id: string, dto: T) {
    return this.http.put(`${this.entityName}/${id}`, dto).pipe(
      catchError(err => {
        console.log(err);
        throw err;
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.entityName}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        throw err;
      })
    );
  }

  list() {
    return this.http.get(`${this.entityName}`);
  }

}
