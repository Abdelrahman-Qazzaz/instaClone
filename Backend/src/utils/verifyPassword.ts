import bcrypt from "bcrypt";
export async function verifyPassword(
  plainText: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainText, hashedPassword);
}
