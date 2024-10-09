import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateChatMessageDTO {
  @IsString()
  content: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  urls: string[];
}
