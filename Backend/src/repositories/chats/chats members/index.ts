import { ChatMember } from "src/models/Chat.ts";
import { User } from "src/models/User.ts";

export type UnformattedChatMember = {
  chat_id: number;
  user_id: number;
  is_admin: boolean;
  created_at: Date | null;
  users: User;
};

export function flattenChatMember(
  unformattedChatMember: UnformattedChatMember
): ChatMember {
  const { users, ...rest } = unformattedChatMember;

  const formattedChatMember = { ...rest, ...users };
  return formattedChatMember;
}
