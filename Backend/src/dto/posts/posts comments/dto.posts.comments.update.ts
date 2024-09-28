import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { Id_userId } from "src/dto/utils/dto.Id_userId.ts";

export class UpdatePostCommentDTO extends Id_userId {
  @IsOptional()
  @IsString()
  caption: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  urls: string[];
}
