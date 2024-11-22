import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional } from "class-validator";

import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";

export class CreatePostDTO {
  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  user_id: number;

  @IsArray()
  media_urls: string[];

  @IsOptional()
  caption: string;

  @IsOptional()
  additional_settings: { hideLikesCount: boolean; disableCommenting: boolean };
}
