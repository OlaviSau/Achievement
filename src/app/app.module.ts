import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryComponent } from './components/summary/summary.component';
import { CategoryComponent } from './components/category/category.component';
import { MatProgressBarModule} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {categoryReducer} from './reducers/category.reducer';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CachingInterceptor} from './http-interceptors/cache.http-interceptor';
import {FocusOnInitDirective} from './directives/focus-on-init.directive';
import {EffectsModule} from '@ngrx/effects';
import {CategoryEffects} from './effects/category.effects';
import {BlurOnEnterDirective} from './directives/blur-on-enter.directive';

@NgModule({
  declarations: [
    BlurOnEnterDirective,
    FocusOnInitDirective,
    AppComponent,
    SummaryComponent,
    CategoryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule,
    StoreModule.forRoot({
      category: categoryReducer
    }),
    EffectsModule.forRoot([CategoryEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
