import { Transform } from "class-transformer";
import { Id_userId } from "../utils/dto.Id_userId.ts";
import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";
import { IsNumber } from "class-validator";

export class GetChatsDTO {}

export class GetChatDTO extends Id_userId {}
