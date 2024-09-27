import { IsNumber } from "class-validator";
import { Transform } from "class-transformer";

import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";

export class DeleteUserDTO {
  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  id: number;
}
