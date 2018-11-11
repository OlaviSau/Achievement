import { Action } from '@ngrx/store';
import {Category} from '../models/category';

export const SET_CATEGORY = 'SET_CATEGORY';

export class SetCategory implements Action {
  readonly type = SET_CATEGORY;

  constructor(public category: Category) { }
}
