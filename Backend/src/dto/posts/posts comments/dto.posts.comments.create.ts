import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { UpdatePostCommentDTO } from "./dto.posts.comments.update.ts";

export class CreatePostCommentDTO {
  @Transform(({ value }) => (value ? Number(value) : null), {
    toClassOnly: true,
  })
  @IsNumber()
  parent_id: number | null;

  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsNumber()
  post_id: number;

  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsNumber()
  user_id: number;

  @IsString()
  caption: string;

  @Transform(({ value }) => (Array.isArray(value) ? value : [value]), {
    toClassOnly: true,
  })
  urls: string[];
}
