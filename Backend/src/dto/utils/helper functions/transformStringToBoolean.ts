export function transformStringToBoolean(s: string): boolean | null {
  if (s === "false") return false;
  if (s === "true") return false;
  return null;
}
