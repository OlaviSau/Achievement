import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryComponent } from './summary/summary.component';
import { CategoryComponent } from './category/category.component';
import { MatProgressBarModule} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {categoriesReducer} from './reducers/categoriesReducer';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule,
    StoreModule.forRoot({ categories: categoriesReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
