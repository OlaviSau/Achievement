import { Action } from '@ngrx/store';
import {CategoryModel} from '../models/category.model';

export const SET_CATEGORY = 'SET_CATEGORY';

export class SetCategoryAction implements Action {
  readonly type = SET_CATEGORY;

  constructor(public category: CategoryModel) { }
}
