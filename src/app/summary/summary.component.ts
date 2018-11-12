import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryModel} from '../models/category.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {CategoryService} from '../services/category.service';
import {SetCategoriesAction} from '../actions/set-categories.action';
import {filter, first, last, map} from 'rxjs/operators';
import {CreateCategoryAction} from '../actions/create-category.action';
import {UpdateCategoryAction} from '../actions/update-category.action';
import {SaveCategoryAction} from '../actions/save-category.action';

@Component({
  selector: 'ad-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  categories: Observable<CategoryModel[]>;
  categoryBeingCreated: Observable<CategoryModel>;

  constructor(private store: Store<AppState>, private categoriesService: CategoryService) {
    const categoryStoreObserver = store.select('category');
    this.categories = categoryStoreObserver.pipe(
      map(categoryStore => categoryStore.list)
    );
    this.categoryBeingCreated = categoryStoreObserver.pipe(
      map(categoryStore => categoryStore.categoryBeingCreated)
    );
  }

  saveCategory(categoryObserver: Observable<CategoryModel>) {
    categoryObserver.pipe(first(), filter(Boolean)).subscribe(
      category => this.store.dispatch(new SaveCategoryAction(category))
    );
  }

  updateCategory(name) { this.store.dispatch(new UpdateCategoryAction(name)); }

  createCategory() { this.store.dispatch(new CreateCategoryAction()); }

  private completionPercent(): Observable<number> {
    return this.categories.pipe(
      map(categories => {
          const total = categories.reduce( (sum, category) => sum + category.totalPoints(), 0);
          return total ? (categories.reduce((sum, category) => sum + category.completedPoints(), 0) / total) * 100 : 0;
        }
      )
    );
  }

  ngOnInit() {
    this.categoriesService.get().then(
      categories => this.store.dispatch(new SetCategoriesAction(categories))
    );
  }

}
