import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";

export class CreatePostDTO {
  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  user_id: number;

  @Transform(({ value }) => (Array.isArray(value) ? value : [value]), {
    toClassOnly: true,
  })
  previewUrls: string[];

  @IsOptional()
  caption: string;

  @IsOptional()
  additionalSettings: { hideLikesCount: boolean; disableCommenting: boolean };
}
