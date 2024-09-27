import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { stringToNumber } from "src/utils/convertToNumber.ts";
export class GetUserDTO {
  @IsOptional()
  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  id: number;

  @IsOptional()
  username: string;

  @IsOptional()
  email: string;
}
