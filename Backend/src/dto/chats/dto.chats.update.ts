import { Transform } from "class-transformer";
import { IsArray, IsNumber } from "class-validator";
import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";
import { CreateChatDTO } from "./dto.chats.create.ts";

export class UpdateChatDTO extends CreateChatDTO {
  @Transform(({ value }) => transformToNumber(value), {
    toClassOnly: true,
  })
  @IsNumber()
  id: number;
}
