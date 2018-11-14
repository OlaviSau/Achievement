import { Action } from '@ngrx/store';
import {SET_CATEGORY, SetCategoryAction} from '../actions/set-category.action';
import {SET_CATEGORIES, SetCategoriesAction} from '../actions/set-categories.action';
import {SAVE_CATEGORY, SaveCategoryAction} from '../actions/save-category.action';

/* tslint:disable:max-line-length */
const initialState = {
  list: []
};
/* tslint:enable:max-line-length */


export function categoryReducer(state = initialState, action: Action) {
  const handler = {
    [SAVE_CATEGORY]({category}: SaveCategoryAction) {
      return {...state, list: [...state.list.filter(c => c.id !== category.getId()), category]};
    },
    [SET_CATEGORIES]({categories}: SetCategoriesAction) {
      return {...state, list: categories };
    },
    [SET_CATEGORY]({category}: SetCategoryAction) {
      return {...state, list: [...state.list.filter(c => c.id !== category.getId()), category] };
    }
  }[action.type];

  return handler ? handler(action) : state;
}
