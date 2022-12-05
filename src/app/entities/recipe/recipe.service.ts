import {Injectable} from '@angular/core';
import {BaseEntityService} from '../common/base-entity.service';
import {RecipeDTO} from './recipe-dto';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RecipeService extends BaseEntityService<RecipeDTO> {

  constructor(
    protected http: HttpClient
  ) {
    super(http, 'recipes');
  }

  public listMyRecipes() {
    return this.http.get<{ recipes: RecipeDTO[] }>('myRecipes');
  }
}
