import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { stringToNumber } from "src/utils/convertToNumber.ts";

export class GetPostCommentDTO {
  @IsOptional()
  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  post_id: number;

  @IsOptional()
  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  parent_id: number | null;

  @IsOptional()
  caption: string;
}
