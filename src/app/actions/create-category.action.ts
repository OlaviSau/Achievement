import { Action } from '@ngrx/store';

export const CREATE_CATEGORY = 'CREATE_CATEGORY';

export class CreateCategoryAction implements Action {
  readonly type = CREATE_CATEGORY;

  constructor() { }
}
