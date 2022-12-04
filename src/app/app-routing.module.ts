import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeEditComponent} from './components/recipe/recipe-edit/recipe-edit.component';
import {RecipeListComponent} from './components/recipe/recipe-list/recipe-list.component';
import {LoginComponent} from './components/user/login/login.component';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';


const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeListComponent,
    data: {
      title: 'Recipes'
    },
    children: [
      {
        path: ':recipe',
        component: RecipeEditComponent
      }
    ]
  },
  {
    path: 'myRecipes',
    component: RecipeListComponent,
    pathMatch: 'full',
    children: [
      {
        path: ':recipe',
        component: RecipeEditComponent
      }
    ],
    data: {
      title: 'My recipes'
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: UserEditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
