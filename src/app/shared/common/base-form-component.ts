import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

export abstract class BaseFormComponent {

  loading: boolean;
  formGroup: FormGroup;
  ngUnsubscribe = new Subject();

  protected constructor(
    protected formBuilder: FormBuilder
  ) {
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.markAllFields(this.formGroup);
      return;
    }
    this.onSave();
  }

  private markAllFields(form: FormGroup | FormArray) {
    Object.values(form.controls).forEach(control => {
      if (control instanceof FormArray) {
        this.markAllFields(control);
      }
      control.markAsTouched();
    });
  }

  abstract onSave();

  abstract getFormGroup();

}
