import {AchievementModel} from './achievement.model';
import * as dasherize from 'dasherize';

export class CategoryModel {
  constructor(properties: {
    name?: string;
    achievements?: AchievementModel[];
  } = {
    achievements: []
  }) {
    this.name = properties.name;
    this.key = dasherize(properties.name);
    this.achievements = properties.achievements;
  }

  key: string;
  name: string;
  achievements: AchievementModel[];

  private static sumPoints(total, achievement: AchievementModel) {
    return total + achievement.points;
  }

  completionPercent() {
    if (!this.totalPoints()) {
      return 0;
    }

    return (this.completedPoints() / this.totalPoints()) * 100;
  }

  completedPoints() {
    return this.achievements.filter(achievement => achievement.completed).reduce(CategoryModel.sumPoints, 0);
  }

  totalPoints() {
    return this.achievements.reduce(CategoryModel.sumPoints, 0);
  }
}
