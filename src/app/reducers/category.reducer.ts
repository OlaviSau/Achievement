import { Action } from '@ngrx/store';
import {CategoryModel} from '../models/category.model';
import {CREATE_CATEGORY} from '../actions/create-category.action';
import {SET_CATEGORY, SetCategoryAction} from '../actions/set-category.action';
import {SET_CATEGORIES, SetCategoriesAction} from '../actions/set-categories.action';
import {UPDATE_CATEGORY, UpdateCategoryAction} from '../actions/update-category.action';
import {SAVE_CATEGORY, SaveCategoryAction} from '../actions/save-category.action';

/* tslint:disable:max-line-length */
const initialState = {
  categoryBeingCreated: null,
  list: []
};
/* tslint:enable:max-line-length */


export function categoryReducer(state = initialState, action: Action) {
  const handlers = {};
  function addHandler(type, handler) {
    handlers[type] = handler;
  }
  addHandler(CREATE_CATEGORY, () => {
    return {...state, categoryBeingCreated: new CategoryModel({})};
  });

  addHandler(UPDATE_CATEGORY, ({name}: UpdateCategoryAction) => {
    return {...state, categoryBeingCreated: new CategoryModel({ name: name }) };
  });

  addHandler(SAVE_CATEGORY, ({category}: SaveCategoryAction) => {
    return {...state, categoryBeingCreated: null, list: category.name ? [...state.list, category] : state.list };
  });

  addHandler(SET_CATEGORIES, ({categories}: SetCategoriesAction) => {
    return {...state, list: categories };
  });

  addHandler(SET_CATEGORY, ({category}: SetCategoryAction) => {
    return {...state, list: [...state.list.filter(c => c.key !== c.key), category] };
  });

  return handlers[action.type] || (a => state) (action);
}
