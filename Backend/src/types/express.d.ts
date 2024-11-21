import { users as user } from "@prisma/client";
import { Post } from "src/models/Post.ts";
import { User } from "src/models/User.ts";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
      story?: { id: number };
      post?: { id: number };
      postComment?: { id: number };
      chat?: { id: number };
      chatMessage?: { id: number };
      media_urls: string[];
    }
  }
}
