import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Category} from '../models/category';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {CategoriesService} from '../services/categories.service';
import {SetCategories} from '../actions/set-categories';
import {map} from 'rxjs/operators';

@Component({
  selector: 'ad-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  categories: Observable<Category[]>;

  constructor(private store: Store<AppState>, private categoriesService: CategoriesService) {
    this.categories = store.select('categories');
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
      categories => this.store.dispatch(new SetCategories(categories))
    );
  }

}
