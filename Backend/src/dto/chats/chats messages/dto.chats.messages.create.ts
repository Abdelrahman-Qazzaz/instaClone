import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

import { stringToNumber } from "src/utils/convertToNumber.ts";

export class CreateChatMessageDTO {
  @IsString()
  content: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  urls: string[];
}
