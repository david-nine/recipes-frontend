import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeService} from './recipe/recipe.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './user/auth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    RecipeService,
    AuthService
  ],
})
export class EntitiesModule {
}
