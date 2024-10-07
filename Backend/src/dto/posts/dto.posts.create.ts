import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { UpdatePostDTO } from "./dto.posts.update.ts";
import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";

export class CreatePostDTO {
  @IsOptional()
  caption: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]), {
    toClassOnly: true,
  })
  urls: string[];
}
