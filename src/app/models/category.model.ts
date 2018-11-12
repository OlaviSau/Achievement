import {AchievementModel} from './achievement.model';
import * as dasherize from 'dasherize';
import {sum} from '../util/sum';
import {infinityToZero} from '../util/infinity-to-zero';

export class CategoryModel {
  constructor(properties: {
    name?: string;
    achievements?: AchievementModel[];
  } = {}) {
    this.name = properties.name;
    this.key = dasherize(properties.name);
    this.achievements = properties.achievements || [];
  }

  key: string;
  name: string;
  achievements: AchievementModel[];

  completionPercent() {
    return infinityToZero(100 * this.completedPoints() / this.totalPoints());
  }

  completedPoints() {
    return sum(...this.achievements.filter(a => a.completed).map(a => a.points));
  }

  totalPoints() {
    return sum(...this.achievements.map(a => a.points));
  }
}
