import {Component, OnInit} from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {SaveCategoryAction} from '../../actions/save-category.action';
import {CategoryCollection} from '../../collections/category.collection';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DeleteCategoryAction} from '../../actions/delete-category.action';

@Component({
  selector: 'ad-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  categoryCollection: Observable<CategoryCollection>;
  activeCategory: CategoryModel;

  ngOnInit() {
    this.categoryCollection = this.store.select('category').pipe(
      map(({list}) => new CategoryCollection(list))
    );
  }

  saveCategory(category: CategoryModel) {
    if (category.getName()) {
      this.store.dispatch(new SaveCategoryAction(category));
    }
    this.activeCategory = null;
  }

  deleteCategory(category) { this.store.dispatch(new DeleteCategoryAction(category)); }
  updateCategory(category) { this.activeCategory = category; }
  createCategory() { this.activeCategory = new CategoryModel(); } // semantics
  creating() { return this.activeCategory && !this.activeCategory.getId(); }
  updating(category) { return this.activeCategory === category; }
  select(el: HTMLElement) {
    setTimeout(() => {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(el);
      selection.removeAllRanges();
      selection.addRange(range);
    });
  }
}
