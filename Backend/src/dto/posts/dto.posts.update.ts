import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";
import { User_target_Ids } from "../utils/dto.user_target_ids.ts";

export class UpdatePostDTO extends User_target_Ids {
  @IsOptional()
  caption: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]), {
    toClassOnly: true,
  })
  urls: string[];
}
