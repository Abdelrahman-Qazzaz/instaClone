import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { stringToNumber } from "src/utils/convertToNumber.ts";
import { CreateChatMessageDTO } from "./dto.chats.messages.create.ts";

// id: message id
export class UpdateChatMessageDTO extends CreateChatMessageDTO {
  @Transform(({ value }) => {
    const [error, val] = stringToNumber(value);
    return error ?? val;
  })
  @IsNumber()
  id: number;
}
