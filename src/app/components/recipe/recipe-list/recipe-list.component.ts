import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../../../entities/recipe/recipe.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {RecipeCardDTO} from '../../../entities/recipe/recipe-card-dto';
import {RecipesPageType} from '../../../entities/common/recipes-page-type';

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

    this.recipesService.list().subscribe(recipes => {
      this.recipes = [
        {
          id: 1,
          name: 'pão de alho',
          // tslint:disable-next-line:max-line-length
          description: 'Receita com um pão de alho deliciosisssssssssssss dasd asdsa dasd asdasd asdsa addas dasd as dsad asdwefsdd asd as das dasdas dasd asd asd asda das ddas dasd asdad asimo para melhorar o seu churrasco',
          photoUrl: 'https://img.itdg.com.br/tdg/images/recipes/000/109/170/356804/356804_original.jpg'
        },
        {
          id: 2,
          name: 'Carbonara',
          description: 'Receita com um pão de alho deliciosissimo para melhorar o seu churrasco',
          photoUrl: 'https://vovopalmirinha.com.br/wp-content/uploads/2016/06/Receita-de-Macarr%C3%A3o-a-carbonara-1.jpg'
        },
        {
          id: 3,
          name: 'Delícia de uva',
          description: 'Receita com um pão de alho deliciosissimo para melhorar o seu churrasco',
          // tslint:disable-next-line:max-line-length
          photoUrl: 'https://s2.glbimg.com/JoWyAKkn1efKsMAgs0f9AlpDw3U=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2022/U/C/VojyqdTV2Tdt6LxhA4IA/delicia-de-uva-aprenda-a-receita.jpg'
        },
        {
          id: 1,
          name: 'pão de alho',
          description: 'Receita com um pão de alho deliciosissimo para melhorar o seu churrasco',
          photoUrl: 'https://img.itdg.com.br/tdg/images/recipes/000/109/170/356804/356804_original.jpg'
        }
      ];
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
