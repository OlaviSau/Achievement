import { Action } from '@ngrx/store';
import {CategoryModel} from '../models/category.model';

export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export class DeleteCategoryAction implements Action {
  readonly type = DELETE_CATEGORY;

  constructor(public category: CategoryModel) { }
}
