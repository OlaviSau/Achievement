import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Category} from '../models/category';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {CategoriesService} from '../services/categories.service';
import {SetCategories} from '../actions/set-categories';

@Component({
  selector: 'ad-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

  httpSubscriber: Subscription;
  categories: Observable<Category[]>;

  constructor(private store: Store<AppState>, private categoriesService: CategoriesService) {
    this.categories = store.select('categories');
  }

  ngOnInit() {
    this.httpSubscriber = this.categoriesService.getCategories().subscribe(
      categories => this.store.dispatch(new SetCategories(categories))
    );
  }

  ngOnDestroy() {
    this.httpSubscriber.unsubscribe();
  }


}
