import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { transformToNumber } from "./helper functions/transformToNumber.ts";

export class Id_userId {
  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  id: number;

  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  user_id: number;
}
