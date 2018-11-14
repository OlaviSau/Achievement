import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {SaveCategoryAction} from '../../actions/save-category.action';
import {CategoryCollection} from '../../collections/category.collection';
import {Observable, Subscription} from 'rxjs';
import {CategoryService} from '../../services/category.service';
import {SetCategoriesAction} from '../../actions/set-categories.action';
import {SubscriptionCollector} from '../../subscription-collector';
import {map} from 'rxjs/operators';

@Component({
  selector: 'ad-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  collection: Observable<CategoryCollection>;
  category: CategoryModel;

  ngOnInit() {
    this.collection = this.store.select('category').pipe(
      map(({list}) => new CategoryCollection(list))
    );
  }

  saveCategory() {
    if (this.category.getName()) {
      this.store.dispatch(new SaveCategoryAction(this.category));
    }
    this.category = null;
  }

  createCategory() { this.category = new CategoryModel(); }
}
