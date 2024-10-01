export type Chat = {
  id: number;
  name: string;
  created_at: Date | null;
};

export type ChatMessage = {
  id: number;
  chat_id: number | null;
  sender_id: number | null;
  content: string;
  urls: string[];
  created_at: Date | null;
};
