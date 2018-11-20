import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryComponent } from './components/summary/summary.component';
import { CategoryComponent } from './components/category/category.component';
import {
  MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatProgressBarModule, MatTooltipModule
} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {categoryReducer} from './reducers/category.reducer';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CachingInterceptor} from './http-interceptors/cache.http-interceptor';
import {FocusOnInitDirective} from './directives/focus-on-init.directive';
import {EffectsModule} from '@ngrx/effects';
import {CategoryEffects} from './effects/category.effects';
import {BlurOnEnterDirective} from './directives/blur-on-enter.directive';
import {StopClickPropagationDirective} from './directives/stop-click-propagation.directive';
import {ConfirmDialogComponent} from './components/dialogs/confirm.dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SelectOnClickDirective} from './directives/select-on-click.directive';
import {DisableClickDirective} from './directives/disable-click.directive';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    StopClickPropagationDirective,
    BlurOnEnterDirective,
    FocusOnInitDirective,
    SelectOnClickDirective,
    AppComponent,
    SummaryComponent,
    CategoryComponent,
    DisableClickDirective
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    StoreModule.forRoot({
      category: categoryReducer
    }),
    EffectsModule.forRoot([CategoryEffects]),
    BrowserModule,
    BrowserAnimationsModule,
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
