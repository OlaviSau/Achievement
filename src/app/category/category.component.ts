import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {Category} from '../models/category';
import {Achievement} from '../models/achievement';
import {CategoriesService} from '../services/categories.service';
import {SetCategory} from '../actions/set-category';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ad-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  category: Category;
  routeSubscription: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private categoriesService: CategoriesService) {}

  sortByCompletion(achievements: Achievement[]) {
    return achievements.sort((l: Achievement, r: Achievement) => l.completed ? -1 : 1 );
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(({key}) => {
          this.store.select('categories').subscribe(
            categories => this.category = categories.find(category => category.key === key)
          );
          this.categoriesService.getCategory(key).then(
            category => this.store.dispatch(new SetCategory(category))
          );
      }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
