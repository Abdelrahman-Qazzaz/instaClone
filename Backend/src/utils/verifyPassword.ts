import bcrypt from "bcrypt";
export async function verifyPassword(
  plainText: string,
  hashedPassword: string
) {
  console.log(plainText);
  console.log(hashedPassword);
  return await bcrypt.compare(plainText, hashedPassword);
}
