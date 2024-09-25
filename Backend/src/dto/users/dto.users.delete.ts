import { IsString } from "class-validator";
import { hash } from "src/utils/hash.ts";

export class DeleteUserDTO {
  @IsString()
  password: string;
  async hashPassword() {
    this.password = await hash(this.password);
  }
}
