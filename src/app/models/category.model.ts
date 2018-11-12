import {AchievementModel} from './achievement.model';
import * as dasherize from 'dasherize';
import {sum} from '../util/sum';

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
    if (!this.totalPoints()) {
      return 0;
    }

    return (this.completedPoints() / this.totalPoints()) * 100;
  }

  completedPoints() {
    return this.achievements.filter(a => a.completed).map(a => a.points).reduce(sum, 0);
  }

  totalPoints() {
    return this.achievements.map(a => a.points).reduce(sum, 0);
  }
}
