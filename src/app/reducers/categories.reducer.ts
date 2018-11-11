import { Action } from '@ngrx/store';
import {Category} from '../models/category';
import {SET_CATEGORIES, SetCategories} from '../actions/set-categories';

/* tslint:disable:max-line-length */
const initialState: Category[] = [];
/* tslint:enable:max-line-length */


export function categoriesReducer(state: Category[] = initialState, action: Action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return (action as SetCategories).categories;
    default:
      return state;
  }
}
