import { RequestHandler } from "express";

import { ICRUDController } from "src/controllers/ICRUDController.ts";
import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { CreateChatMembersDTO } from "src/dto/chats/chats members/dto.chats.members.create.ts";
import { UpdateChatMemberDTO } from "src/dto/chats/chats members/dto.chats.members.update.ts";
import { anyToNumber, stringToNumber } from "src/utils/convertToNumber.ts";
import {
  GetChatMemberDTO,
  GetChatMembersDTO,
} from "src/dto/chats/chats members/dto.chats.members.get.ts";
import { DeleteChatMembersDTO } from "src/dto/chats/chats members/dto.chats.members.where.ts";
import { chatsMembersRepo } from "src/repositories/chats/chats members/repo.chats.members.ts";
import { ChatMember } from "src/models/Chat.ts";

class ChatsMembersController implements ICRUDController {
  take: 10;
  create: RequestHandler = async (req, res) => {
    const [typeError, chat_id] = stringToNumber(req.params.chat_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeErrors, data] = await validateAndTypeCast(CreateChatMembersDTO, {
      ...req.body,
      chat_id,
    });

    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chatMember] = await chatsMembersRepo.create({ data });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chatMember });
  };
  update: RequestHandler = async (req, res) => {
    const [typeError, chat_id] = stringToNumber(req.params.chat_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeError2, user_id] = stringToNumber(req.params.member_id);
    if (typeError2) return httpResponses.BadRequest(res, { typeError2 });

    const [typeErrors, data] = await validateAndTypeCast(UpdateChatMemberDTO, {
      ...req.body,
      chat_id,
      user_id,
    });

    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chatMember] = await chatsMembersRepo.update({
      where: { id: data.user_id, chat_id: data.chat_id },
      data,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chatMember });
  };

  get: RequestHandler = async (req, res) => {
    const [typeError, chat_id] = stringToNumber(req.params.chat_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeError2, page] = anyToNumber(req.query.page);
    if (typeError2) return httpResponses.BadRequest(res, { typeError2 });

    const [typeErrors, where] = await validateAndTypeCast(GetChatMembersDTO, {
      chat_id,
    });

    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chatMembers] = await chatsMembersRepo.get({
      where,
      pagination: { take: this.take, skip: this.take * page },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chatMembers });
  };

  getById: RequestHandler = async (req, res) => {
    const [typeError, chat_id] = stringToNumber(req.params.chat_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeError2, user_id] = stringToNumber(req.params.member_id);
    if (typeError2) return httpResponses.BadRequest(res, { typeError2 });

    const [typeErrors, where] = await validateAndTypeCast(GetChatMemberDTO, {
      chat_id,
      user_id,
    });

    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, chatMember] = await chatsMembersRepo.getOne({
      where,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { chatMember });
  };

  delete: RequestHandler = async (req, res) => {
    const [typeError, chat_id] = stringToNumber(req.params.chat_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeErrors, where] = await validateAndTypeCast(
      DeleteChatMembersDTO,
      {
        ...req.body,
        chat_id,
      }
    );

    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const { users_ids } = where;
    const chatMembers: ChatMember[] = [];
    for (const user_id of users_ids) {
      const [error, chatMember] = await chatsMembersRepo.delete({
        where: { user_id, chat_id },
      });
      if (error) return httpResponses.InternalServerError(res);
      chatMembers.push(chatMember);
    }

    return httpResponses.SuccessResponse(res, { chatMembers });
  };
}

export const chatsMembersController = new ChatsMembersController();
