import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from '../../../shared/common/base-form-component';
import {FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent extends BaseFormComponent implements OnInit {

  constructor(
    protected formBuilder: FormBuilder
  ) {
    super(formBuilder);
  }

  ngOnInit() {
    this.formGroup = this.getFormGroup();
  }

  getFormGroup() {
    return this.formBuilder.group({
      'name': [null, Validators.compose([Validators.required])],
      'description': [null, Validators.compose([Validators.required])],
      'howToMake': [null, Validators.compose([Validators.required])],
      'cookTIme': [null, Validators.compose([Validators.required])],
      'photoUrl': [null, Validators.compose([Validators.required])],
      'revenue': [null, Validators.compose([Validators.required])],
      'ingredients': this.formBuilder.array([]),
    });
  }

  get ingredients() {
    return this.formGroup.controls['ingredients'] as FormArray;
  }

  onSave() {
  }
}
