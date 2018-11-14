import {Component, OnInit} from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {SaveCategoryAction} from '../../actions/save-category.action';
import {CategoryCollection} from '../../collections/category.collection';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'ad-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  categoryCollection: Observable<CategoryCollection>;
  categoryBeingCreated: CategoryModel;
  categoryBeingUpdated: CategoryModel;

  ngOnInit() {
    this.categoryCollection = this.store.select('category').pipe(
      map(({list}) => new CategoryCollection(list))
    );
  }

  saveCategory(category: CategoryModel) {
    if (category.getName()) {
      this.store.dispatch(new SaveCategoryAction(category));
    }
    this.categoryBeingCreated = null;
    this.categoryBeingUpdated = null;
  }

  createCategory() { this.categoryBeingCreated = new CategoryModel(); }
}
