import {Achievement} from './achievement';

export class Category {

  id: number;
  key: string;
  name: string;
  achievements: Achievement[];
  constructor(properties) {
    Object.assign(this, properties);
  }

  completionPercent() {
    const sumPoints = (total, achievement) => total + achievement.points;
    const completed: Achievement[] = this.achievements.filter(achievement => achievement.completed);
    return (completed.reduce(sumPoints, 0) / this.achievements.reduce(sumPoints, 0)) * 100;
  }
}
