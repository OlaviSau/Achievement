export function replaceById(list, item) {
  list = list.concat();
  list[list.findIndex(i => i.id === item.id)] = item;
  return list;
}
