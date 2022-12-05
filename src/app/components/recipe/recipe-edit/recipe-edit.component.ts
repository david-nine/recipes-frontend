import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from '../../../shared/common/base-form-component';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../../entities/recipe/recipe.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {UnitType} from '../../../entities/recipe/ingredient-dto';
import {RecipeDTO} from '../../../entities/recipe/recipe-dto';
import {RecipesPageType} from '../../../entities/common/recipes-page-type';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent extends BaseFormComponent implements OnInit {
  private params: Params;
  private routeData: Data;
  options: [string, string][];

  constructor(
    protected formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(formBuilder);
  }

  ngOnInit() {
    this.formGroup = this.getFormGroup();
    this.options = Object.entries(UnitType);
    this.route.params.subscribe(data => this.onResolveRouteParams(data));
    this.route.data.subscribe(data => this.onResolveRouteData(data));
  }

  getFormGroup() {
    return this.formBuilder.group({
      'name': [null, Validators.compose([Validators.required])],
      'description': [null, Validators.compose([Validators.required])],
      'howToMake': [null, Validators.compose([Validators.required])],
      'cookTime': [null, Validators.compose([Validators.required])],
      'photoUrl': [null, Validators.compose([Validators.required])],
      'revenue': [null, Validators.compose([Validators.required])],
      'ingredients': this.formBuilder.array([]),
    });
  }

  get ingredients() {
    return this.formGroup.controls['ingredients'] as FormArray;
  }

  onSave() {
    this.loading = true;
    if (this.isNew()) {
      this.recipeService.post(this.formGroup.value)
        .subscribe(data => {
          this.router.navigate(['../'], {relativeTo: this.route});
        });
    } else {
      const recipe = this.formGroup.value as RecipeDTO;
      recipe.id = this.params.recipe;
      this.recipeService.put(this.params['recipe'], recipe)
        .subscribe(data => {
          this.router.navigate(['../'], {relativeTo: this.route});
        });
    }
  }

  private onResolveRouteParams(params: Params) {
    this.params = params;
    if (this.isNew()) {
      this.ingredients.push(this.createIngredientForm());
    } else {
      this.loading = true;
      this.recipeService.get(params['recipe']).subscribe(data => {
        this.formGroup.patchValue(data);
        this.loading = false;
      });
    }
  }

  onAddIngredient() {
    this.ingredients.push(this.createIngredientForm());
  }

  createIngredientForm(): FormGroup {
    const ingredientForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      quantity: [null, Validators.compose([Validators.required, Validators.min(1)])],
      unit: [UnitType.QT, Validators.compose([Validators.required])]
    });

    ingredientForm.markAsPristine();

    return ingredientForm;
  }

  isNew() {
    return this.params['recipe'] === 'new';
  }

  isMyRecipe() {
    return this.routeData['title'] === RecipesPageType.MY_RECIPES;
  }

  onRemoveIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onDelete(index: number) {
    this.recipeService.delete(this.params.recipe).subscribe(() => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

  private onResolveRouteData(data: Data) {
    this.routeData = data;
  }
}
