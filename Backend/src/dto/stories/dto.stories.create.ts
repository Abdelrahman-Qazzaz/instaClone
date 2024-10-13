import { Transform } from "class-transformer";
import { IsNumber, IsUrl } from "class-validator";

import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";

export class CreateStoryDTO {
  @Transform(({ value }) => transformToNumber(value), { toClassOnly: true })
  @IsNumber()
  user_id: number;

  @IsUrl()
  media_url: string;
}
