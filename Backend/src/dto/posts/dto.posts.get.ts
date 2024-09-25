import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { stringToNumber } from "src/utils/stringToNumber.ts";

export class GetPostDTO {
  @IsOptional()
  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  id: number;

  @IsOptional()
  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  user_id: number;

  @IsOptional()
  caption: string;
}
