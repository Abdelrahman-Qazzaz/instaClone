import { users as user } from "@prisma/client";
import { Post } from "src/models/Post.ts";
import { User } from "src/models/User.ts";

export type FirebaseFile = { url: string; type: "image" | "video" };
declare global {
  namespace Express {
    interface Request {
      firebaseFiles: FirebaseFile[];
      user?: { id: number };
      story?: { id: number };
      post?: { id: number };
      postComment?: { id: number };
      chat?: { id: number };
      chatMessage?: { id: number };
    }
  }
}
