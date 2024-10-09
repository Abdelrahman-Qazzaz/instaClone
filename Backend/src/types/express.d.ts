import { users as user } from "@prisma/client";
import { Post } from "src/models/Post.ts";
import { User } from "src/models/User.ts";

declare global {
  namespace Express {
    interface Request {
      firebaseUrls: string[];
      user?: { id: number };
      post?: { id: number };
      postComment?: { id: number };
      chat?: { id: number };
      chatMessage?: { id: number };
    }
  }
}
