export class GenericCollection<T> implements Iterable<T> {
  protected list;
  constructor(list: T[]) {
    this.list = list;
  }

  [Symbol.iterator](): Iterator<T> {
    const collection = this;
    let pointer = 0;
    return {
      next(): IteratorResult<T> {
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
