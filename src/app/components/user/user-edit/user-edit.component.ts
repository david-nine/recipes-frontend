import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from '../../../shared/common/base-form-component';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../entities/user/user-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent extends BaseFormComponent implements OnInit {

  constructor(
    protected formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    super(formBuilder);
    this.formGroup = this.getFormGroup();
  }

  ngOnInit() {
  }

  getFormGroup() {
    return this.formBuilder.group({
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
    console.log(user);
    this.userService.post(user).subscribe(data => {
      this.router.navigate(['recipes']);
    });
  }
}
