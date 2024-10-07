import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

import { transformToNumber } from "src/dto/utils/helper functions/transformToNumber.ts";

export class CreatePostCommentDTO {
  @IsString()
  caption: string;

  @Transform(({ value }) => (Array.isArray(value) ? value : [value]), {
    toClassOnly: true,
  })
  urls: string[];
}
