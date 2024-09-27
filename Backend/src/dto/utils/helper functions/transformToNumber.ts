import { stringToNumber } from "src/utils/convertToNumber.ts";

export function transformToNumber(value: string) {
  const [err, newValue] = stringToNumber(value);
  if (err) return null;
  return newValue;
}
