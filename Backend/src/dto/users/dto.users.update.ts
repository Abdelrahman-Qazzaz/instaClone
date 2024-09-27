import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  Length,
} from "class-validator";
import { DeleteUserDTO } from "./dto.users.delete.ts";

export class UpdateUserDTO extends DeleteUserDTO {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  username: string;

  @IsOptional()
  @IsUrl()
  pfp_url: string;
}
