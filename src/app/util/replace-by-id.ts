export function replaceById(list, item) {
  list = list.concat();
  const index = list.findIndex(i => i.id === item.id);
  if (index !== -1) {
    list[index] = item;
  } else {
    list.push(item);
  }

  return list;
}
