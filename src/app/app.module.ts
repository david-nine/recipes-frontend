import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecipeListComponent,
    RecipeEditComponent,
    HeaderComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
