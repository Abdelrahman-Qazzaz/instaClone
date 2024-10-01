import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { UpdatePostDTO } from "./dto.posts.update.ts";
import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";

export class CreatePostDTO {
  @Transform(({ value }) => transformToNumber(value), {
    toClassOnly: true,
  })
  @IsNumber()
  user_id: number;

  @IsOptional()
  caption: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]), {
    toClassOnly: true,
  })
  urls: string[];
}
