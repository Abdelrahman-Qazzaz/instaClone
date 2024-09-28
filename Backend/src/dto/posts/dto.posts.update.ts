import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";
import { Id_userId } from "../utils/dto.Id_userId.ts";

export class UpdatePostDTO extends Id_userId {
  @IsOptional()
  caption: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]), {
    toClassOnly: true,
  })
  urls: string[];
}
