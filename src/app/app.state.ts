import { CategoryModel } from './models/category.model';

export interface AppState {
  readonly categories: CategoryModel[];
}
