import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";

import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";

export class CreateChatDTO {
  @IsString()
  name: string;
}
