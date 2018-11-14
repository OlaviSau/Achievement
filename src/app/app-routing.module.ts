import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SummaryComponent} from './components/summary/summary.component';
import {CategoryComponent} from './components/category/category.component';

const routes: Routes = [
  { path: '', component: SummaryComponent },
  { path: ':key', component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
