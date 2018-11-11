import { Action } from '@ngrx/store';
import {CategoryModel} from '../models/category.model';
import {SET_CATEGORIES, SetCategoriesAction} from '../actions/set-categories.action';
import {SET_CATEGORY, SetCategoryAction} from '../actions/set-category.action';

/* tslint:disable:max-line-length */
const initialState: CategoryModel[] = [];
/* tslint:enable:max-line-length */


export function categoriesReducer(state: CategoryModel[] = initialState, action: Action) {
  switch (action.type) {
    case SET_CATEGORY:
      const categoryToSet = (action as SetCategoryAction).category;
      return state.filter(category => category.id !== categoryToSet.id).concat([categoryToSet]);
    case SET_CATEGORIES:
      return (action as SetCategoriesAction).categories;
    default:
      return state;
  }
}
