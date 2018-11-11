import {Achievement} from './achievement';

export class Category {
  constructor(properties) {
    Object.assign(this, properties);
  }

  id: number;
  key: string;
  name: string;
  achievements: Achievement[] = [];

  private static sumPoints(total, achievement: Achievement) {
    return total + achievement.points;
  }

  completionPercent() {
    if (!this.totalPoints()) {
      return 0;
    }

    return (this.completedPoints() / this.totalPoints()) * 100;
  }

  completedPoints() {
    return this.achievements.filter(achievement => achievement.completed).reduce(Category.sumPoints, 0);
  }

  totalPoints() {
    return this.achievements.reduce(Category.sumPoints, 0);
  }
}
