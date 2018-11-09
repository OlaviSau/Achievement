import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {Category} from '../models/category';

@Component({
  selector: 'ad-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  category: Category;
  private routeSubscription: any;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params: { key: string }) =>
      this.store.select('categories').subscribe(
        categories => this.category = categories.find(category => category.key === params.key)
      )
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
