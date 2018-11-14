import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryModel} from '../models/category.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {CreateCategoryAction} from '../actions/create-category.action';
import {UpdateCategoryAction} from '../actions/update-category.action';
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
  categoryBeingCreated: CategoryModel;

  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(this.store.select('category').subscribe(
      categoryStore => {
        this.collection = new CategoryCollection(categoryStore.list);
        this.categoryBeingCreated = categoryStore.categoryBeingCreated;
      }
    ));
    this.categoriesService.get().then(
      categories => this.store.dispatch(new SetCategoriesAction(categories))
    );
  }

  ngOnDestroy() { this.subscriptions.forEach(subscription => subscription.unsubscribe()); }

  saveCategory(category: CategoryModel) { this.store.dispatch(new SaveCategoryAction(category)); }

  updateCategory(name) { this.store.dispatch(new UpdateCategoryAction(name)); }

  createCategory() { this.store.dispatch(new CreateCategoryAction()); }

}
