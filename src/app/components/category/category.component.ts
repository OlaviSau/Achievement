import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {CategoryModel} from '../../models/category.model';
import {AchievementModel} from '../../models/achievement.model';
import {CategoryService} from '../../services/category.service';
import {SetCategoryAction} from '../../actions/set-category.action';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ad-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  category: CategoryModel;
  routeSubscription: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private categoryService: CategoryService) {}

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((paramMap) => {
          const key = paramMap.get('key')
          this.store.select('category').subscribe(
            categoryStore => this.category = categoryStore.list.find(category => category.getKey() === key)
          );
          this.categoryService.get(key).then(
            category => this.store.dispatch(new SetCategoryAction(category))
          );
      }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
