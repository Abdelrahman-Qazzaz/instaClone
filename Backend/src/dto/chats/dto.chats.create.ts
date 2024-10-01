import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";

import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";

export class CreateChatDTO {
  @Transform(({ value }) => transformToNumber(value), {
    toClassOnly: true,
  })
  @IsNumber()
  user_id: number;

  @IsString()
  name: string;
}
