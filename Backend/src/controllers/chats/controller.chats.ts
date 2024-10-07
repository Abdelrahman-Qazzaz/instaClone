import { RequestHandler } from "express";

import { ICRUDController } from "../ICRUDController.ts";
import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { CreateChatDTO } from "src/dto/chats/dto.chats.create.ts";
import { UpdateChatDTO } from "src/dto/chats/dto.chats.update.ts";
import { anyToNumber } from "src/utils/convertToNumber.ts";
import { GetChatsDTO } from "src/dto/chats/dto.chats.get.ts";
import { WhereChatDTO } from "src/dto/chats/dto.chats.where.ts";
import { chatsRepo } from "src/repositories/chats/repo.chats.ts";

class ChatsController implements ICRUDController {
  take: 10;
  create: RequestHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(CreateChatDTO, {
      ...req.body,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chat] = await chatsRepo.create({ data });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chat });
  };
  update: RequestHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(UpdateChatDTO, {
      ...req.body,
      id: req.params.chat_id,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chat] = await chatsRepo.update({
      where: { id: data.id, user_id: data.user_id },
      data,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chat });
  };

  get: RequestHandler = async (req, res) => {
    const [typeError, page] = anyToNumber(req.query.page);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeErrors, where] = await validateAndTypeCast(GetChatsDTO, {});
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chats] = await chatsRepo.get({
      where,
      pagination: { take: this.take, skip: this.take * page },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chats });
  };

  getById: RequestHandler = async (req, res) => {};

  delete: RequestHandler = async (req, res) => {
    const [typeErrors, where] = await validateAndTypeCast(WhereChatDTO, {
      id: req.params.chat_id,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chat] = await chatsRepo.delete({
      where,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chat });
  };
}

export const chatsController = new ChatsController();
