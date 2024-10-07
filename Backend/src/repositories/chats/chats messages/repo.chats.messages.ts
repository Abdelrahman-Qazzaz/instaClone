import { ChatMessage } from "src/models/Chat.ts";
import { db } from "src/db.ts";
import { ICRUDRepo } from "src/repositories/ICRUDRepo.ts";
import { CreateChatMessageDTO } from "src/dto/chats/chats messages/dto.chats.messages.create.ts";
import { UpdateChatMessageDTO } from "src/dto/chats/chats messages/dto.chats.messages.update.ts";
import { GetChatMessagesDTO } from "src/dto/chats/chats messages/dto.chats.messages.get.ts";
import { WhereChatMessageDTO } from "src/dto/chats/chats messages/dto.chats.messages.where.ts";
import { Pagination } from "src/types/Pagination.ts";
import { Id_userId } from "src/dto/utils/dto.Id_userId.ts";

type AsyncChatMessageTuple = Promise<[unknown, ChatMessage | null]>;
type AsyncChatMessageTupleArray = Promise<[unknown, ChatMessage[] | null]>;

class ChatsMessagesRepo
  implements
    ICRUDRepo<
      ChatMessage,
      CreateChatMessageDTO,
      UpdateChatMessageDTO,
      GetChatMessagesDTO,
      WhereChatMessageDTO
    >
{
  create: (args: { data: CreateChatMessageDTO }) => AsyncChatMessageTuple =
    async (args) => {
      const { data } = args;
      try {
        const chatMessage = await db.chats_messages.create({ data });
        return [null, chatMessage];
      } catch (error) {
        return [error, null];
      }
    };
  getOne: (args: {
    where: { id: number; user_id?: number };
  }) => AsyncChatMessageTuple = async (args) => {
    try {
      const { where } = args;
      const chatMessage: ChatMessage | null = await db.chats_messages.findFirst(
        { where }
      );
      return [null, chatMessage];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  };
  get: (args: {
    pagination: Pagination;
    where?: GetChatMessagesDTO | undefined;
  }) => AsyncChatMessageTupleArray = async (args) => {
    const { pagination, where } = args;
    try {
      const chatMessages: ChatMessage[] = await db.chats_messages.findMany({
        where,
        ...pagination,
      });

      return [null, chatMessages];
    } catch (error) {
      return [error, null];
    }
  };
  update: (args: {
    data: UpdateChatMessageDTO;
    where: Id_userId;
  }) => AsyncChatMessageTuple = async (args) => {
    const { data, where } = args;
    try {
      const chatMessage = await db.chats_messages.update({ where, data });
      return [null, chatMessage];
    } catch (error) {
      return [error, null];
    }
  };
  delete: (args: { where: WhereChatMessageDTO }) => AsyncChatMessageTuple =
    async (args) => {
      const { where } = args;

      try {
        const chatMessage = await db.chats_messages.delete({ where });
        return [null, chatMessage];
      } catch (error) {
        return [error, null];
      }
    };
}

export const chatsMessagesRepo = new ChatsMessagesRepo();
