import { Action } from '@ngrx/store';
import {CREATE_CATEGORY} from '../actions/create-category.action';
import {SET_CATEGORY, SetCategoryAction} from '../actions/set-category.action';
import {SET_CATEGORIES, SetCategoriesAction} from '../actions/set-categories.action';
import {UPDATE_CATEGORY, UpdateCategoryAction} from '../actions/update-category.action';
import {CategoryModel} from '../models/category.model';

/* tslint:disable:max-line-length */
const initialState = {
  categoryBeingCreated: null,
  list: []
};
/* tslint:enable:max-line-length */


export function categoryReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SET_CATEGORY:
      const categoryToSet = (action as SetCategoryAction).category;
      return Object.assign({}, state, {
        list: state.list.filter(category => category.id !== categoryToSet.id).concat([categoryToSet])
      });
    case SET_CATEGORIES:
      return Object.assign({}, state, {
        list: (action as SetCategoriesAction).categories,
      });
    case UPDATE_CATEGORY:
      if (action instanceof UpdateCategoryAction) {
        return Object.assign({}, state, {
          categoryBeingCreated: new CategoryModel({
            name: action.name
          }),
        });
      }
      return state;
    case CREATE_CATEGORY:
      return Object.assign({}, state, {
        categoryBeingCreated: new CategoryModel({}),
      });
    default:
      return state;
  }
}
