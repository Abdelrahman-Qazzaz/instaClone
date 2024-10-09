import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { transformToNumber } from "src/dto/utils/helper functions/transformToNumber.ts";

export class WhereChatMemberDTO {
  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  user_id: number;

  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  chat_id: number;
}
