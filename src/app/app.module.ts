import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/user/login/login.component';
import {RecipeListComponent} from './components/recipe/recipe-list/recipe-list.component';
import {RecipeEditComponent} from './components/recipe/recipe-edit/recipe-edit.component';
import {HeaderComponent} from './components/header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {URLInterceptorService} from './shared/services/url-interceptor.service';
import {AuthInterceptorService} from './shared/services/auth-interceptor.service';
import {ReactiveFormsModule} from '@angular/forms';
import {ControlErrorsModule} from './shared/components/control-errors/control-errors.module';
import {EntitiesModule} from './entities/entities.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecipeListComponent,
    RecipeEditComponent,
    HeaderComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ControlErrorsModule,
    EntitiesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: URLInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
