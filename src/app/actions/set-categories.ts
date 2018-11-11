import { Action } from '@ngrx/store';
import {Category} from '../models/category';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export class SetCategories implements Action {
  readonly type = SET_CATEGORIES;

  constructor(public categories: Category[]) {}
}
