import express from "express";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { postsLikesController } from "src/controllers/posts/posts likes/controller.posts.likes.ts";
// root:  /posts/:id/likes
export const postsLikesRouter = express.Router();

postsLikesRouter.get("/", postsLikesController.getDetails); // see who liked the post
postsLikesRouter.get("/count", postsLikesController.getCount); // see how many likes a post has, without details.

postsLikesRouter.post("/", checkAuth, postsLikesController.create); // like a post
postsLikesRouter.delete("/", checkAuth, postsLikesController.delete); // unlike a post
