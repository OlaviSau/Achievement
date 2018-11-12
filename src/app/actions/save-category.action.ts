import { Action } from '@ngrx/store';
import {CategoryModel} from '../models/category.model';

export const SAVE_CATEGORY = 'SAVE_CATEGORY';

export class SaveCategoryAction implements Action {
  readonly type = SAVE_CATEGORY;

  constructor(public category: CategoryModel) { }
}
