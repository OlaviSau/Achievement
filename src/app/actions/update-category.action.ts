import { Action } from '@ngrx/store';

export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export class UpdateCategoryAction implements Action {
  readonly type = UPDATE_CATEGORY;

  constructor(public name: string) { }
}
