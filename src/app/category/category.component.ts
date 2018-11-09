import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {Category} from '../models/category';
import {Achievement} from '../models/achievement';

@Component({
  selector: 'ad-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  category: Category;
  private routeSubscription: any;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  sortByCompletion(achievements: Achievement[]) {
    return achievements.sort((l: Achievement, r: Achievement) => l.completed ? -1 : 1 );
  }

  completionPercent(category: Category) {
    const sumPoints = (total, achievement) => total + achievement.points;
    const completed: Achievement[] = category.achievements.filter(achievement => achievement.completed);
    return (completed.reduce(sumPoints, 0) / category.achievements.reduce(sumPoints, 0)) * 100;
  }

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
