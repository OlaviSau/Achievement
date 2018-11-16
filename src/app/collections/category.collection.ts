import {CategoryModel} from '../models/category.model';
import {infinityToZero} from '../util/infinity-to-zero';
import {sum} from '../util/sum';
import {GenericCollection} from './generic.collection';

export class CategoryCollection extends GenericCollection<CategoryModel> implements Iterable<CategoryModel> {

  constructor(list: CategoryModel[]) {
    super(list);
  }

  completionPercent() {
    return infinityToZero(
      100 * sum(...this.list.map(c => c.completedPoints())) / sum(...this.list.map(c => c.totalPoints()))
    );
  }
}
