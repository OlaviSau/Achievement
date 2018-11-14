import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SummaryComponent} from './components/summary/summary.component';
import {CategoryComponent} from './components/category/category.component';
import {SummaryResolverService} from './services/summary-resolver.service';

const routes: Routes = [
  { path: '', component: SummaryComponent, resolve: [SummaryResolverService] },
  { path: ':key', component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
