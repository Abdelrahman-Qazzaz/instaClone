import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { UpdatePostDTO } from "./dto.posts.update.ts";

export class CreatePostDTO extends UpdatePostDTO {
  @Transform(({ value }) => Number(value), {
    toClassOnly: true,
  })
  @IsNumber()
  user_id: number;
}
