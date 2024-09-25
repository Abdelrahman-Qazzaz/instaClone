import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export class UpdatePostDTO {
  @IsOptional()
  caption: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]), {
    toClassOnly: true,
  })
  urls: string[];
}
