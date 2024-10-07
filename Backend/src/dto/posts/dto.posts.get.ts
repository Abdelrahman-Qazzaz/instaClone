import { IsOptional } from "class-validator";

export class GetPostDTO {
  @IsOptional()
  caption?: string;
}
