export function infinityToZero(number): number {
  return isFinite(number) ? number : 0;
}
