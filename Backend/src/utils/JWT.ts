import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export function generateJWTToken(payload: { user_id: number }) {
  const token = jwt.sign(payload, process.env.SECRETWORD!, {
    expiresIn: "168h",
  });
  return token;
}
