import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { stringToNumber } from "src/utils/convertToNumber.ts";
import { CreateChatMessageDTO } from "./dto.chats.messages.create.ts";

export class UpdateChatMessageDTO extends CreateChatMessageDTO {}
