import {CategoryModel} from '../models/category.model';
import {infinityToZero} from '../util/infinity-to-zero';
import {sum} from '../util/sum';

export class CategoryCollection implements Iterable<CategoryModel> {
  private list;
  constructor(list: CategoryModel[]) {
    this.list = list;
  }

  completionPercent() {
    return infinityToZero(
      100 * sum(...this.list.map(c => c.completedPoints())) / sum(...this.list.map(c => c.totalPoints()))
    );
  }

  has(category: CategoryModel) {
    return Boolean(this.list.find(c => category.getKey() === c.getKey()));
  }

  [Symbol.iterator](): Iterator<CategoryModel> {
    const collection = this;
    let pointer = 0;
    return {
      next(): IteratorResult<CategoryModel> {
        return pointer < collection.list.length ? {
          done: false,
          value: collection.list[pointer++]
        } : {
          done: true,
          value: undefined
        };
      }
    };
  }
}
