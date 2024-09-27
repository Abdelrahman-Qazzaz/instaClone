import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { User_target_Ids } from "src/dto/utils/dto.user_target_ids.ts";

export class UpdatePostCommentDTO extends User_target_Ids {
  @IsOptional()
  @IsString()
  caption: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  urls: string[];
}
