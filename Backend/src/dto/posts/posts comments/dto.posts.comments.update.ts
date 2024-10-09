import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class UpdatePostCommentDTO {
  @IsOptional()
  @IsString()
  caption: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  urls: string[];
}
