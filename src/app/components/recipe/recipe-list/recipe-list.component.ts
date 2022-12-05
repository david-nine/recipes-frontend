import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../../../entities/recipe/recipe.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {RecipeCardDTO} from '../../../entities/recipe/recipe-card-dto';
import {RecipesPageType} from '../../../entities/common/recipes-page-type';
import {RecipeDTO} from '../../../entities/recipe/recipe-dto';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  loading = true;
  recipes: RecipeCardDTO[];
  title: string;

  private ngUnsubscribe = new Subject();
  isMyRecipes: boolean;

  constructor(
    private recipesService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.data.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(data => this.routeDataResolve(data));

    this.recipesService.list().subscribe((data: { recipes: RecipeDTO[] }) => {
      this.recipes = data.recipes;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
  }

  private routeDataResolve(data: Data) {
    this.title = data['title'];
    this.isMyRecipes = this.title === RecipesPageType.MY_RECIPES;
  }

  onAddRecipe() {
    this.router.navigate(['myRecipes', 'new']);
  }

  onShowDetails(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
  }
}
