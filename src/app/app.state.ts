import { Category } from './models/category';

export interface AppState {
  readonly categories: Category[];
}
