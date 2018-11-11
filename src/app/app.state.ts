import { CategoryModel } from './models/category.model';

export interface AppState {
  readonly category: {
    categoryBeingCreated: CategoryModel;
    list: CategoryModel[];
  };
}
