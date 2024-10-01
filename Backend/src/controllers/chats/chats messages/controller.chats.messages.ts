import { RequestHandler } from "express";
import { ICRUDController } from "src/controllers/ICRUDController.ts";
import { CreateChatMessageDTO } from "src/dto/chats/chats messages/dto.chats.messages.create.ts";
import { DeleteChatMessageDTO } from "src/dto/chats/chats messages/dto.chats.messages.delete.ts";
import { GetChatMessagesDTO } from "src/dto/chats/chats messages/dto.chats.messages.get.ts";
import { UpdateChatMessageDTO } from "src/dto/chats/chats messages/dto.chats.messages.update.ts";
import { chatsMessagesRepo } from "src/repositories/chats/chats messages/repo.chats.messages.ts";
import { anyToNumber } from "src/utils/convertToNumber.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";

class ChatsMessagesController implements ICRUDController {
  take: 10;
  create: RequestHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(CreateChatMessageDTO, {
      ...req.body,
      user_id: req.user!.id,
      chat_id: req.params.chat_id,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chatMessage] = await chatsMessagesRepo.create({ data });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chatMessage });
  };
  update: RequestHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(UpdateChatMessageDTO, {
      ...req.body,
      user_id: req.user!.id,
      id: req.params.message_id,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chat] = await chatsMessagesRepo.update({
      where: { id: data.id, user_id: data.user_id },
      data,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chat });
  };

  get: RequestHandler = async (req, res) => {
    const [typeError, page] = anyToNumber(req.query.page);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeErrors, where] = await validateAndTypeCast(GetChatMessagesDTO, {
      user_id: req.user!.id,
      chat_id: req.params.chat_id,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chatMessages] = await chatsMessagesRepo.get({
      where,
      pagination: { take: this.take, skip: this.take * page },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chatMessages });
  };

  getById: RequestHandler = async (req, res) => {};

  delete: RequestHandler = async (req, res) => {
    const [typeErrors, where] = await validateAndTypeCast(
      DeleteChatMessageDTO,
      {
        user_id: req.user!.id,
        id: req.params.message_id,
      }
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chat] = await chatsMessagesRepo.delete({
      where,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chat });
  };
}

export const chatsMessagesController = new ChatsMessagesController();
