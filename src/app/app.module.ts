import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryComponent } from './summary/summary.component';
import { CategoryComponent } from './category/category.component';
import { MatProgressBarModule} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {categoryReducer} from './reducers/category.reducer';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CachingInterceptor} from './http-interceptors/cache.http-interceptor';
import {FocusOnInitDirective} from './directives/focus-on-init.directive';

@NgModule({
  declarations: [
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
    })
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
