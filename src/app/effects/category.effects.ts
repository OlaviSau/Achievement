import {CategoryService} from '../services/category.service';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {SAVE_CATEGORY, SaveCategoryAction} from '../actions/save-category.action';
import {map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';

@Injectable()
export class CategoryEffects {

  constructor(
    private actions: Actions,
    private service: CategoryService
  ) {}

  @Effect()
  save(): Observable<Action> {
    return this.actions.pipe(
      ofType(SAVE_CATEGORY),
      map(
        action =>  this.service.save((action as SaveCategoryAction).category)
      ),
      map( () => new class implements Action {
        type = 'CATEGORY_SAVED';
      })
    );
  }
}
