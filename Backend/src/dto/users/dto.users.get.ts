import { IsOptional } from "class-validator";

export class GetUserDTO {
  @IsOptional()
  username?: string;

  @IsOptional()
  email?: string;
}
