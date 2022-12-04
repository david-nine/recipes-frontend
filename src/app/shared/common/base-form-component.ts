import {FormBuilder, FormGroup} from '@angular/forms';

export abstract class BaseFormComponent {

  loading: boolean;
  formGroup: FormGroup;

  protected constructor(
    protected formBuilder: FormBuilder
  ) {
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      Object.values(this.formGroup.controls).forEach(control => control.markAsTouched());
      return;
    }
    this.onSave();
  }

  abstract onSave();

  abstract getFormGroup();

}
