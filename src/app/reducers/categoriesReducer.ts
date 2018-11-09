import { Action } from '@ngrx/store';
import {Category} from '../models/category';

/* tslint:disable:max-line-length */
const initialState: Category[] = [
  {
    id: 1,
    name: 'Literature',
    key: 'literature',
    achievements: [
      {
        id: 1,
        key: 'the-7-habits-of-highly-effective-people',
        title: 'The 7 Habits of Highly Effective People',
        img: 'the-7-habits-of-highly-effective-people.jpg',
        points: 10,
        completed: true,
        description: 'Read The 7 Habits of Highly Effective People cover to cover.'
      },
      {
        id: 2,
        key: 'introduction-to-algorithms',
        title: 'Introduction to Algorithms',
        img: 'introduction-to-algorithms.png',
        points: 10,
        completed: false,
        description: 'Read Introduction to Algorithms cover to cover.'
      },
      {
        id: 3,
        key: 'code-complete',
        title: 'Code Complete',
        img: 'code-complete.png',
        points: 10,
        completed: true,
        description: 'Read Code Complete cover to cover.'
      }
    ]
  },
  {
    id: 2,
    name: 'Travel',
    key: 'travel',
    achievements: []
  }
];
/* tslint:enable:max-line-length */


export function categoriesReducer(state: Category[] = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
