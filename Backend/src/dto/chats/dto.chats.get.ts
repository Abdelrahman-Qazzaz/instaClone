import { Transform } from "class-transformer";
import { Id_userId } from "../utils/dto.Id_userId.ts";
import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";
import { IsNumber } from "class-validator";

export class GetChatsDTO {
  @Transform(({ value }) => transformToNumber(value), {
    toClassOnly: true,
  })
  @IsNumber()
  user_id: number;
}

export class GetChatDTO extends Id_userId {}