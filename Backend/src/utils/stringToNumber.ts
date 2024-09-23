export function stringToNumber(value: string): [Error, null] | [null, number] {
  const newValue = Number(value);
  if (isNaN(newValue)) return [new Error("NaN"), null];
  return [null, newValue];
}
