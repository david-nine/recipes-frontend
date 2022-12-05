import {Injectable} from '@angular/core';
import {BaseEntityService} from '../common/base-entity.service';
import {HttpClient} from '@angular/common/http';
import {UserDTO} from './user-dto';

@Injectable()
export class UserService extends BaseEntityService<UserDTO> {

  constructor(
    protected http: HttpClient
  ) {
    super(http, 'users');
  }
}
