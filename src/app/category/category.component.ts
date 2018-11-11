import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {CategoryModel} from '../models/category.model';
import {AchievementModel} from '../models/achievement.model';
import {CategoriesService} from '../services/categories.service';
import {SetCategoryAction} from '../actions/set-category.action';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ad-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  category: CategoryModel;
  routeSubscription: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private categoriesService: CategoriesService) {}

  sortByCompletion(achievements: AchievementModel[]) {
    return achievements.sort((l: AchievementModel, r: AchievementModel) => l.completed ? -1 : 1 );
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(({key}) => {
          this.store.select('categories').subscribe(
            categories => this.category = categories.find(category => category.key === key)
          );
          this.categoriesService.getCategory(key).then(
            category => this.store.dispatch(new SetCategoryAction(category))
          );
      }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
