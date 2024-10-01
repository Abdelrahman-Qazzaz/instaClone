import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

import { transformToNumber } from "src/dto/utils/helper functions/transformToNumber.ts";
import { stringToNumber } from "src/utils/convertToNumber.ts";

export class CreateChatMessagesDTO {
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

  @IsString()
  content: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  urls: string[];
}
