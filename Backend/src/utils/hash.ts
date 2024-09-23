import bcrypt from "bcrypt";
const saltRounds = 10;
export async function hash(password: string) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.log(error);
    return "";
  }
}
