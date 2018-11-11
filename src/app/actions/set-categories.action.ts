import { Action } from '@ngrx/store';
import {CategoryModel} from '../models/category.model';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export class SetCategoriesAction implements Action {
  readonly type = SET_CATEGORIES;

  constructor(public categories: CategoryModel[]) {}
}
