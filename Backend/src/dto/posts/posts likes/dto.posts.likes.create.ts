import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { transformToNumber } from "src/dto/utils/helper functions/transformToNumber.ts";

export class CreatePostLikeDTO {
  @Transform(({ value }) => transformToNumber(value), {
    toClassOnly: true,
  })
  @IsNumber()
  user_id: number;

  @Transform(({ value }) => transformToNumber(value), {
    toClassOnly: true,
  })
  @IsNumber()
  post_id: number;
}
