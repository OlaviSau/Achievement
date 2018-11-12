import { Action } from '@ngrx/store';
import {CREATE_CATEGORY} from '../actions/create-category.action';
import {SET_CATEGORY, SetCategoryAction} from '../actions/set-category.action';
import {SET_CATEGORIES, SetCategoriesAction} from '../actions/set-categories.action';
import {UPDATE_CATEGORY, UpdateCategoryAction} from '../actions/update-category.action';
import {CategoryModel} from '../models/category.model';
import {SAVE_CATEGORY, SaveCategoryAction} from '../actions/save-category.action';

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
        list: state.list.filter(category => category.key !== categoryToSet.key).concat([categoryToSet])
      });
    case SET_CATEGORIES:
      return Object.assign({}, state, {
        list: (action as SetCategoriesAction).categories,
      });
    case SAVE_CATEGORY:
      const categoryToSave = (action as SaveCategoryAction).category;
      const update = {
        categoryBeingCreated: null,
        list: state.list
      };
      if (categoryToSave.name) {
        update.list = state.list.concat([categoryToSave]);
      }
      return Object.assign({}, state, update);
    case UPDATE_CATEGORY:
      return Object.assign({}, state, {
        categoryBeingCreated: new CategoryModel({
          name: (action as UpdateCategoryAction).name
        }),
      });
    case CREATE_CATEGORY:
      return Object.assign({}, state, {
        categoryBeingCreated: new CategoryModel({}),
      });
    default:
      return state;
  }
}
