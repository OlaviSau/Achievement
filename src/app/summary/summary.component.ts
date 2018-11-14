import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryModel} from '../models/category.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {SaveCategoryAction} from '../actions/save-category.action';
import {CategoryCollection} from '../collections/category.collection';
import {Subscription} from 'rxjs';
import {CategoryService} from '../services/category.service';
import {SetCategoriesAction} from '../actions/set-categories.action';
import {SubscriptionCollector} from '../subscription-collector';

@Component({
  selector: 'ad-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy, SubscriptionCollector {

  constructor(private store: Store<AppState>, private categoriesService: CategoryService) {}

  collection: CategoryCollection;
  category: CategoryModel;

  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(this.store.select('category').subscribe(
      ({list}) => this.collection = new CategoryCollection(list)
    ));
    this.categoriesService.get().then(
      categories => this.store.dispatch(new SetCategoriesAction(categories))
    );
  }

  ngOnDestroy() { this.subscriptions.forEach(subscription => subscription.unsubscribe()); }

  saveCategory() {
    if (this.category.getName()) {
      this.store.dispatch(new SaveCategoryAction(this.category));
    }
    this.category = null;
  }

  createCategory() { this.category = new CategoryModel(); }
}
