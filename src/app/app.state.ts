import { CategoryModel } from './models/category.model';

export interface AppState {
  readonly category: CategoryState;
}

export interface CategoryState {
  categoryBeingCreated: CategoryModel;
  list: CategoryModel[];
}
