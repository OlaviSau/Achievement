import {Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {CategoryService} from './category.service';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {SetCategoriesAction} from '../actions/set-categories.action';


@Injectable({
  providedIn: 'root'
})
export class SummaryResolverService implements Resolve<void> {

  constructor(private categoryService: CategoryService, private store: Store<AppState>) {}

  resolve(): Promise<void> {
    return this.categoryService.get().then( list => this.store.dispatch(new SetCategoriesAction(list)));
  }

}
