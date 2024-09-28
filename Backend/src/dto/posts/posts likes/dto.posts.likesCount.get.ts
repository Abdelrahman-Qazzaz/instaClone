import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { transformToNumber } from "src/dto/utils/helper functions/transformToNumber.ts";

export class GetPostLikesCountDTO {
  @Transform(({ value }) => transformToNumber(value), {
    toClassOnly: true,
  })
  @IsNumber()
  post_id: number;
}
