import { Transform } from "class-transformer";

import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";
import { IsNumber } from "class-validator";

export class GetChatsDTO {
  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  user_id: number;
}
