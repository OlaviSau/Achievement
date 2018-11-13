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

  categories: Observable<CategoryModel[]>;
  categoryBeingCreated: CategoryModel;
  private categoryBeingCreatedSubscription: Subscription;

  constructor(private store: Store<AppState>, private categoriesService: CategoryService) {}

  saveCategory(category: CategoryModel) {
    this.store.dispatch(new SaveCategoryAction(category));
  }

  updateCategory(name) { this.store.dispatch(new UpdateCategoryAction(name)); }

  createCategory() { this.store.dispatch(new CreateCategoryAction()); }

  private completionPercent(): Observable<number> {
    return this.categories.pipe(
      map(categories => infinityToZero(
          100 * sum(...categories.map(c => c.completedPoints())) / sum(...categories.map(c => c.totalPoints()))
        )
      )
    );
  }

  ngOnInit() {
    const categoryStoreObserver = this.store.select('category');
    this.categories = categoryStoreObserver.pipe(
      map(categoryStore => categoryStore.list)
    );
    this.categoryBeingCreatedSubscription = categoryStoreObserver.subscribe(
      categoryStore => this.categoryBeingCreated = categoryStore.categoryBeingCreated
    );
    this.categoriesService.get().then(
      categories => this.store.dispatch(new SetCategoriesAction(categories))
    );
  }

  ngOnDestroy() {
    this.categoryBeingCreatedSubscription.unsubscribe();
  }

}
