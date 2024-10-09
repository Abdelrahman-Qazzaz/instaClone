import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

import { transformToNumber } from "src/dto/utils/helper functions/transformToNumber.ts";
import { anyToNumber } from "src/utils/convertToNumber.ts";

export class CreatePostCommentDTO {
  @Transform(
    ({ value }) => {
      const [_, val] = anyToNumber(value);
      return val;
    },
    { toClassOnly: true }
  )
  @IsNumber()
  user_id: number;

  @Transform(
    ({ value }) => {
      const [_, val] = anyToNumber(value);
      return val;
    },
    { toClassOnly: true }
  )
  @IsNumber()
  post_id: number;

  @IsOptional()
  @Transform(
    ({ value }) => {
      const [_, val] = anyToNumber(value);
      return val;
    },
    { toClassOnly: true }
  )
  @IsNumber()
  parent_id: number;

  @IsString()
  caption: string;

  @Transform(({ value }) => (Array.isArray(value) ? value : [value]), {
    toClassOnly: true,
  })
  urls: string[];
}
