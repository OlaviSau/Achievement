import {AchievementModel} from './achievement.model';
import * as dashify from 'dashify';
import {sum} from '../util/sum';
import {infinityToZero} from '../util/infinity-to-zero';

export class CategoryModel {
  constructor({id, name, achievements} = {id: undefined, name: '', achievements: []}) {
    this.id = id;
    this.setName(name);
    this.setAchievements(achievements);
  }

  private id: number;
  private key: string;
  private name: string;
  achievements: AchievementModel[];

  public getId() { return this.id; }
  public getKey() { return this.key; }
  public getName() { return this.name; }

  public setName(name: string) {
    this.name = name;
    this.key = dashify(name);
  }

  public setAchievements(achievements = []) {
    this.achievements = achievements;
  }

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
