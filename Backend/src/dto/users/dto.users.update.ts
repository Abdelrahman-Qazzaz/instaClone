import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  Length,
} from "class-validator";
import { WhereUserDTO } from "./dto.users.where.ts";

export class UpdateUserDTO extends WhereUserDTO {
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
