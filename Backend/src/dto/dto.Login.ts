import { Transform } from "class-transformer";
import { IsEmail, IsStrongPassword } from "class-validator";
import { hash } from "src/utils/hash.ts";

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
