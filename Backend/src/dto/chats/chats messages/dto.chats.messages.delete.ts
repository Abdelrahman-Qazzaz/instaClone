import { Transform } from "class-transformer";
import { stringToNumber } from "src/utils/convertToNumber.ts";
import { IsNumber } from "class-validator";

// id : message id
export class DeleteChatMessagesDTO {
  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  id: number;

  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  user_id: number;
}
