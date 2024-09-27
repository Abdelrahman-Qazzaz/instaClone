import { Transform } from "class-transformer";
import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginDTO {
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
