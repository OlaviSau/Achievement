import { CategoryModel } from './models/category.model';

export interface AppState {
  readonly category: CategoryState;
}

export interface CategoryState {
  list: CategoryModel[];
}
