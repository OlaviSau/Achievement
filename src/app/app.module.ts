import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryComponent } from './summary/summary.component';
import { CategoryComponent } from './category/category.component';
import { MatProgressBarModule} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {categoriesReducer} from './reducers/categories.reducer';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CachingInterceptor} from './http-interceptors/cache.http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    CategoryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule,
    StoreModule.forRoot({ categories: categoriesReducer })
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
