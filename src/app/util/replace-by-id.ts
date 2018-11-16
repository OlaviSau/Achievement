export function replaceById(list, item) {
  list = list.concat();
  const index = list.findIndex(i => i.id === item.id);
  if (index) {
    list[index] = item;
  } {
    list.push(index);
  }

  return list;
}
