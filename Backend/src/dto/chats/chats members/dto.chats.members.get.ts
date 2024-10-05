import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

import { stringToNumber } from "src/utils/convertToNumber.ts";

export class GetChatMembersDTO {
  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  chat_id: number;
}
export class GetChatMemberDTO extends GetChatMembersDTO {
  @IsOptional()
  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  user_id: number;
}
