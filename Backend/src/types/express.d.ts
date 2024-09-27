import { users as user } from "@prisma/client";
import { Post } from "src/models/posts/Post.ts";
import { User } from "src/models/User.ts";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      post?: Post;
    }
  }
}
