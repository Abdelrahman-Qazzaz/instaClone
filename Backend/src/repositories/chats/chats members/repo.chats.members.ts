import { db } from "src/db.ts";
import { ChatMember } from "src/models/Chat.ts";
import { ICRUDRepo } from "src/repositories/ICRUDRepo.ts";

import { CreateChatMembersDTO } from "src/dto/chats/chats members/dto.chats.members.create.ts";
import { GetChatMembersDTO } from "src/dto/chats/chats members/dto.chats.members.get.ts";
import { UpdateChatMemberDTO } from "src/dto/chats/chats members/dto.chats.members.update.ts";
import { DeleteChatMembersDTO } from "src/dto/chats/chats members/dto.chats.members.where.ts";

import { Pagination } from "src/types/Pagination.ts";
import { flattenChatMember, UnformattedChatMember } from "./index.ts";

type AsyncChatMemberTuple = Promise<[unknown, ChatMember | null]>;
type AsyncChatMemberTupleArray = Promise<[unknown, ChatMember[] | null]>;

class ChatsMembersRepo
  implements
    ICRUDRepo<
      ChatMember,
      WhereChatMembersDTO,
      CreateChatMembersDTO,
      UpdateChatMemberDTO,
      GetChatMembersDTO
    >
{
  create: (args: { data: CreateChatMembersDTO }) => AsyncChatMemberTupleArray =
    async (args) => {
      const { chat_id, users_ids } = args.data;

      const chatMembers: ChatMember[] = [];
      try {
        for (const user_id of users_ids) {
          const unformattedChatMember: UnformattedChatMember =
            await db.chats_members.create({
              data: { chat_id, user_id },
              include: { users: true },
            });
          const chatMember = flattenChatMember(unformattedChatMember);
          chatMembers.push(chatMember);
        }

        return [null, chatMembers];
      } catch (error) {
        return [error, null];
      }
    };
  getOne: (args: {
    where: { user_id: number; chat_id: number };
  }) => AsyncChatMemberTuple = async (args) => {
    const { where } = args;

    try {
      const unformattedChatMember: UnformattedChatMember | null =
        await db.chats_members.findFirst({
          where: { user_id: where.user_id, chat_id: where.chat_id },
          include: { users: true },
        });
      if (!unformattedChatMember) return [null, null];

      const chatMember = flattenChatMember(unformattedChatMember);
      return [null, chatMember];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  };
  get: (args: {
    pagination: Pagination;
    where?: GetChatMembersDTO | undefined;
  }) => AsyncChatMemberTupleArray = async (args) => {
    const { pagination, where } = args;

    try {
      const unformattedChatMembers: UnformattedChatMember[] =
        await db.chats_members.findMany({
          where,
          include: { users: true },
          ...pagination,
        });
      const chatMembers: ChatMember[] = [];
      for (const unformattedChatMember of unformattedChatMembers) {
        chatMembers.push(flattenChatMember(unformattedChatMember));
      }
      return [null, chatMembers];
    } catch (error) {
      return [error, null];
    }
  };
  update: (args: {
    data: UpdateChatMemberDTO;
    where: { id: number; chat_id: number };
  }) => AsyncChatMemberTuple = async (args) => {
    const { where, data } = args;

    try {
      const unformattedChatMember = await db.chats_members.update({
        where: {
          chat_id_user_id: { chat_id: where.chat_id, user_id: where.id },
        },
        data,
        include: { users: true },
      });
      const chatMember = flattenChatMember(unformattedChatMember);
      return [null, chatMember];
    } catch (error) {
      return [error, null];
    }
  };
  delete: (args: { where: DeleteChatMembersDTO }) => AsyncChatMemberTupleArray =
    async (args) => {
      const { chat_id, user_id } = args.where;

      try {
        const chatMembers: ChatMember[] = [];
        for (const user_id of users_ids) {
          const unformattedChatMember = await db.chats_members.delete({
            where: { chat_id_user_id: { chat_id, user_id } },
            include: { users: true },
          });
          const formattedChatMember = flattenChatMember(unformattedChatMember);
          chatMembers.push(formattedChatMember);
        }

        return [null, chatMembers];
      } catch (error) {
        return [error, null];
      }
    };
}

export const chatsMembersRepo = new ChatsMembersRepo();
