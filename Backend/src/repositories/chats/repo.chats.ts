import { Chat } from "src/models/Chat.ts";

import { db } from "../../db.ts";
import { ICRUDRepo } from "../ICRUDRepo.ts";
import { Pagination } from "src/types/Pagination.ts";

import { CreateChatDTO } from "src/dto/chats/dto.chats.create.ts";
import { UpdateChatDTO } from "src/dto/chats/dto.chats.update.ts";
import { GetChatsDTO } from "src/dto/chats/dto.chats.get.ts";
import { WhereChatDTO } from "src/dto/chats/dto.chats.where.ts";

type AsyncChatTuple = Promise<[unknown, Chat | null]>;

type AsyncChatTupleArray = Promise<[unknown, Chat[] | null]>;

class ChatsRepo
  implements
    ICRUDRepo<Chat, CreateChatDTO, UpdateChatDTO, GetChatsDTO, WhereChatDTO>
{
  create: (args: { data: CreateChatDTO }) => AsyncChatTuple = async (args) => {
    const { data } = args;
    try {
      const chat = await db.chats.create({ data });
      return [null, chat];
    } catch (error) {
      return [error, null];
    }
  };

  getOne: (args: { where: WhereChatDTO }) => AsyncChatTuple = async (args) => {
    const { where } = args;
    try {
      const chats = await db.chats.findFirst({
        where,
      });
      return [null, chats];
    } catch (error) {
      return [error, null];
    }
  };

  //get your chats
  get: (args: {
    pagination: Pagination;
    where: GetChatsDTO;
  }) => AsyncChatTupleArray = async (args) => {
    const { pagination, where } = args;

    try {
      const chats = await db.chats.findMany({
        where: { chats_members: { some: { user_id: where.user_id } } },
        ...pagination,
      });
      return [null, chats];
    } catch (error) {
      return [error, null];
    }
  };
  update: (args: {
    data: UpdateChatDTO;
    where: WhereChatDTO;
  }) => AsyncChatTuple = async (args) => {
    const { data, where } = args;
    try {
      const chat = await db.chats.update({ where, data });
      return [null, chat];
    } catch (error) {
      return [error, null];
    }
  };
  delete: (args: { where: WhereChatDTO }) => AsyncChatTuple = async (args) => {
    const { where } = args;

    try {
      const chat = await db.chats.delete({ where });
      return [null, chat];
    } catch (error) {
      return [error, null];
    }
  };
}

export const chatsRepo = new ChatsRepo();
