import { IsOptional, IsString } from "class-validator";

export class CreateChatDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image_url: string;
}
