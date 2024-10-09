import { RequestHandler } from "express";
import { ICRUDController } from "src/controllers/ICRUDController.ts";
import { CreateChatMessageDTO } from "src/dto/chats/chats messages/dto.chats.messages.create.ts";
import { WhereChatMessageDTO } from "src/dto/chats/dto.chats.where.ts";
import { GetChatMessagesDTO } from "src/dto/chats/chats messages/dto.chats.messages.get.ts";
import { UpdateChatMessageDTO } from "src/dto/chats/chats messages/dto.chats.messages.update.ts";
import { chatsMessagesRepo } from "src/repositories/chats/chats messages/repo.chats.messages.ts";
import { anyToNumber, stringToNumber } from "src/utils/convertToNumber.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";

class ChatsMessagesController implements ICRUDController {
  take: 10;
  create: RequestHandler = async (req, res) => {
    const [typeError, chat_id] = stringToNumber(req.params.chat_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeErrors, data] = await validateAndTypeCast(CreateChatMessageDTO, {
      ...req.body,
      chat_id,
      urls: req.firebaseUrls,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chatMessage] = await chatsMessagesRepo.create({ data });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chatMessage });
  };
  update: RequestHandler = async (req, res) => {
    const [typeError, id] = stringToNumber(req.params.message_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeErrors, data] = await validateAndTypeCast(UpdateChatMessageDTO, {
      ...req.body,
      urls: req.firebaseUrls,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chat] = await chatsMessagesRepo.update({
      where: { id },
      data,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chat });
  };

  get: RequestHandler = async (req, res) => {
    const [typeError, page] = anyToNumber(req.query.page);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeErrors, where] = await validateAndTypeCast(GetChatMessagesDTO, {
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
    const [typeError, id] = stringToNumber(req.params.message_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [error, chat] = await chatsMessagesRepo.delete({
      where: { id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chat });
  };
}

export const chatsMessagesController = new ChatsMessagesController();
