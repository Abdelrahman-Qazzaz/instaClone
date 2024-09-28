import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

import { transformToNumber } from "src/dto/utils/helper functions/transformToNumber.ts";

export class CreatePostCommentDTO {
  @Transform(({ value }) => transformToNumber(value), {
    toClassOnly: true,
  })
  @IsNumber()
  parent_id: number | null;

  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  post_id: number;

  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  user_id: number;

  @IsString()
  caption: string;

  @Transform(({ value }) => (Array.isArray(value) ? value : [value]), {
    toClassOnly: true,
  })
  urls: string[];
}
