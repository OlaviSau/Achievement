import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {CategoryModel} from '../models/category.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {CategoryService} from '../services/category.service';
import {SetCategoriesAction} from '../actions/set-categories.action';
import {map} from 'rxjs/operators';
import {CreateCategoryAction} from '../actions/create-category.action';
import {UpdateCategoryAction} from '../actions/update-category.action';
import {SaveCategoryAction} from '../actions/save-category.action';
import {sum} from '../util/sum';
import {infinityToZero} from '../util/infinity-to-zero';

@Component({
  selector: 'ad-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

  categories: CategoryModel[] = [];
  categoryBeingCreated: CategoryModel;
  private categoryStoreSubscription: Subscription;

  constructor(private store: Store<AppState>, private categoriesService: CategoryService) {}

  ngOnInit() {
    this.categoryStoreSubscription = this.store.select('category').subscribe(
      categoryStore => {
        this.categories = categoryStore.list;
        this.categoryBeingCreated = categoryStore.categoryBeingCreated;
      }
    );
    this.categoriesService.get().then(
      categories => this.store.dispatch(new SetCategoriesAction(categories))
    );
  }

  ngOnDestroy() { this.categoryStoreSubscription.unsubscribe(); }

  saveCategory(category: CategoryModel) { this.store.dispatch(new SaveCategoryAction(category)); }

  updateCategory(name) { this.store.dispatch(new UpdateCategoryAction(name)); }

  createCategory() { this.store.dispatch(new CreateCategoryAction()); }

  completionPercent(): number {
    return infinityToZero(
      100 * sum(...this.categories.map(c => c.completedPoints())) / sum(...this.categories.map(c => c.totalPoints()))
    );
  }

}
