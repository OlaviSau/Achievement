import {CategoryService} from '../services/category.service';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {SAVE_CATEGORY, SaveCategoryAction} from '../actions/save-category.action';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {SetCategoryAction} from '../actions/set-category.action';
import {DELETE_CATEGORY, DeleteCategoryAction} from '../actions/delete-category.action';

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
        (action: SaveCategoryAction) =>  {
          this.service.save(action.category);
          return action.category;
        }
      ),
      map( category  => new SetCategoryAction(category) )
    );
  }

  @Effect()
  delete(): Observable<Action> {
    return this.actions.pipe(
      ofType(DELETE_CATEGORY),
      map(
        (action: DeleteCategoryAction) =>  {
          this.service.delete(action.category);
          return action.category;
        }
      ),
      map( category  => new class implements Action {
        type = 'NULL';
      } )
    );
  }
}
