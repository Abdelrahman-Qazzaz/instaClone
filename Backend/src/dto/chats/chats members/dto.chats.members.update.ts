import { Transform } from "class-transformer";
import { IsBoolean, IsNumber } from "class-validator";
import { transformStringToBoolean } from "src/dto/utils/helper functions/transformStringToBoolean.ts";
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

  @Transform(({ value }) => transformStringToBoolean(value))
  @IsBoolean()
  is_admin: boolean;
}
