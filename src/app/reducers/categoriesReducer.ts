import { Action } from '@ngrx/store';
import {Category} from '../models/category';

/* tslint:disable:max-line-length */
const initialState: Category[] = [
  {
    id: 1,
    name: 'Literature',
    key: 'literature'
  },
  {
    id: 2,
    name: 'Travel',
    key: 'travel'
  },
  {
    id: 3,
    name: 'Travel',
    key: 'travel'
  },
  {
    id: 4,
    name: 'Travel',
    key: 'travel'
  },
  {
    id: 5,
    name: 'Travel',
    key: 'travel'
  },
  {
    id: 6,
    name: 'Travel',
    key: 'travel'
  },
  {
    id: 7,
    name: 'Travel',
    key: 'travel'
  },
];
/* tslint:enable:max-line-length */


export function categoriesReducer(state: Category[] = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
