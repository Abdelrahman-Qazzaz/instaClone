import { IsNumber } from "class-validator";
import { CreatePostCommentDTO } from "./dto.posts.comments.create.ts";
import { Transform } from "class-transformer";

export class UpdatePostCommentDTO extends CreatePostCommentDTO {
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsNumber()
  comment_id: number;
}
