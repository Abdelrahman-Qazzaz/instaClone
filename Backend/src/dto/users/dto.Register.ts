import { IsOptional, IsString, IsUrl, Length } from "class-validator";
import { LoginDTO } from "./dto.Login.ts";
import { hash } from "src/utils/hash.ts";

export class RegisterDTO extends LoginDTO {
  @IsString()
  @Length(3, 20)
  username: string;

  @IsOptional()
  @IsUrl()
  pfp_url: string;

  async hashPassword() {
    this.password = await hash(this.password);
  }
}
