import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { transformToNumber } from "./helper functions/transformToNumber.ts";

export class Target_id_User_id {
  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  target_id: number;

  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  user_id: number;
}
