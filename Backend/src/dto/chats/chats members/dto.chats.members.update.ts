import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { stringToNumber } from "src/utils/convertToNumber.ts";

export class UpdateChatMemberDTO {
  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  chat_id: number;

  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  user_id: number;
}
