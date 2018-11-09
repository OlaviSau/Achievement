import {Achievement} from './achievement';

export interface Category {
  id: number;
  key: string;
  name: string;
  achievements: Achievement[];
}
