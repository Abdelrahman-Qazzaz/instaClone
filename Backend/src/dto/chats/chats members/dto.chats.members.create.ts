import { Transform } from "class-transformer";
import { IsArray, IsNumber } from "class-validator";

import { transformToNumber } from "src/dto/utils/helper functions/transformToNumber.ts";
import { stringToNumber } from "src/utils/convertToNumber.ts";

export class CreateChatMembersDTO {
  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  user_id: number;

  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  chat_id: number;

  @Transform(
    ({ value }) => {
      if (!Array.isArray(value)) {
        value = [value];
      }
      return value.map((val: string) => transformToNumber(val));
    },
    {
      toClassOnly: true,
    }
  )
  @IsArray()
  members_ids: number[];
}
