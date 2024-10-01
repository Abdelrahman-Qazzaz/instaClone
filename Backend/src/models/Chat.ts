export type Chat = {
  id: number;
  name: string;
  created_at: Date | null;
};

export type ExtendedChat = {
  chats_members: {
    chat_id: number;
    user_id: number;
    is_admin: boolean;
    created_at: Date | null;
  }[];
  chats_messages: {
    id: number;
    chat_id: number | null;
    sender_id: number | null;
    content: string;
    urls: string[];
    created_at: Date | null;
  }[];
} & Chat;
