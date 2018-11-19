import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {CategoryModel} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';
import {SetCategoryAction} from '../../actions/set-category.action';
import {Observable, Subscription} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'ad-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category$: Observable<CategoryModel>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private categoryService: CategoryService) {}

  ngOnInit() {
    this.category$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('key')),
      tap(key => this.categoryService.get(key).then(category => this.store.dispatch(new SetCategoryAction(category)))),
      switchMap(key => this.store.select('category').pipe(
        map(categoryStore => categoryStore.list.find(c => c.getKey() === key))
      ))
    );
  }
}
