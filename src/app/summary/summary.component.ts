import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryModel} from '../models/category.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {CategoriesService} from '../services/categories.service';
import {SetCategoriesAction} from '../actions/set-categories.action';
import {map} from 'rxjs/operators';
import {CreateCategoryAction} from '../actions/create-category.action';
import {UpdateCategoryAction} from '../actions/update-category.action';

@Component({
  selector: 'ad-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  categories: Observable<CategoryModel[]>;
  categoryBeingCreated: Observable<CategoryModel>;

  constructor(private store: Store<AppState>, private categoriesService: CategoriesService) {
    this.categories = store.select('category').pipe(
      map(categoryStore => categoryStore.list)
    );
    this.categoryBeingCreated = store.select('category').pipe(
      map(categoryCreation => categoryCreation.categoryBeingCreated)
    );
  }

  updateCategory(name, id) {
    this.store.dispatch(new UpdateCategoryAction(name, id));
  }

  createCategory() {
    this.store.dispatch(new CreateCategoryAction());
  }

  private completionPercent(): Observable<number> {
    return this.categories.pipe(
      map(categories => {
          const total = categories.reduce( (sum, category) => sum + category.totalPoints(), 0);
          if (!total) {
            return 0;
          }
          return (categories.reduce((sum, category) => sum + category.completedPoints(), 0) / total) * 100;
        }
      )
    );
  }

  ngOnInit() {
    this.categoriesService.getCategories().then(
      categories => this.store.dispatch(new SetCategoriesAction(categories))
    );
  }

}
