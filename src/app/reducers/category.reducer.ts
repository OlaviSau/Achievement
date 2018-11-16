import { Action } from '@ngrx/store';
import {SET_CATEGORY, SetCategoryAction} from '../actions/set-category.action';
import {SET_CATEGORIES, SetCategoriesAction} from '../actions/set-categories.action';
import {replaceById} from '../util/replace-by-id';
import {DELETE_CATEGORY, DeleteCategoryAction} from '../actions/delete-category.action';

/* tslint:disable:max-line-length */
const initialState = {
  list: []
};
/* tslint:enable:max-line-length */


export function categoryReducer(state = initialState, action: Action) {
  const handler = {
    [DELETE_CATEGORY]({category}: DeleteCategoryAction) {
      return {...state, list: state.list.filter(c => category.getId() !== c.getId()) };
    },
    [SET_CATEGORIES]({categories}: SetCategoriesAction) {
      return {...state, list: categories };
    },
    [SET_CATEGORY]({category}: SetCategoryAction) {
      return {...state, list: replaceById(state.list, category) };
    }
  }[action.type];

  return handler ? handler(action) : state;
}
