import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from '../../../shared/common/base-form-component';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../entities/user/user-service';
import {Router} from '@angular/router';
import {AuthService} from '../../../entities/user/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent extends BaseFormComponent implements OnInit {

  constructor(
    protected formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    super(formBuilder);
    this.formGroup = this.getFormGroup();
  }

  ngOnInit() {
    if (this.isLogged()) {
      this.userService.get(this.authService.userId.toString())
        .subscribe(user => {
          this.formGroup.patchValue(user);
        });
    }
  }

  getFormGroup() {
    return this.formBuilder.group({
      'id': [null, Validators.compose([])],
      'login': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmPassword': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'photoUrl': [null, Validators.compose([])],
    });
  }

  onSave() {
    const user = this.formGroup.value;
    delete user['confirmPassword'];
    if (this.isLogged()) {
      this.userService.put(this.formGroup.value['id'], this.formGroup.value);
    } else {
      this.userService.post(user).subscribe(data => {
        this.router.navigate(['recipes']);
      });

    }
  }

  isLogged() {
    return this.authService.isLogged();
  }
}
