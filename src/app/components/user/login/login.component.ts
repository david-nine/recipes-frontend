import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../entities/user/auth.service';
import {BaseFormComponent} from '../../../shared/common/base-form-component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseFormComponent implements OnInit {

  loginError: boolean;
  private currentUserId;

  constructor(
    private authService: AuthService,
    protected formBuilder: FormBuilder,
    private router: Router
  ) {
    super(formBuilder);
    this.formGroup = this.getFormGroup();
  }

  ngOnInit() {
  }

  getFormGroup() {
    return this.formBuilder.group({
      'name': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  onSave() {
    this.loading = true;
    this.authService.logIn(this.formGroup.value[LoginForm.NAME], this.formGroup.value[LoginForm.PASSWORD])
      .subscribe((data: {accessToken: string, userId: number}) => {
        if (this.authService.isLogged()) {
          this.router.navigate(['myRecipes']);
        } else {
          this.loginError = true;
        }
      });
  }

  onCloseErrorAlert() {
    this.loginError = false;
  }
}

enum LoginForm {
  NAME = 'name',
  PASSWORD = 'password'
}
