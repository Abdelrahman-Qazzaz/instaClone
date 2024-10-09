import express from "express";
import { postsCommentsLikesController } from "src/controllers/posts/posts comments/posts comments likes/controller.posts.comments.likes.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";

export const postsCommentsLikesRouter = express.Router();

postsCommentsLikesRouter.get("/", postsCommentsLikesController.getDetails); // see who liked the comment
postsCommentsLikesRouter.get("/count", postsCommentsLikesController.getCount); // see how many likes a comment has, without details.

postsCommentsLikesRouter.post(
  "/",
  checkAuth,
  postsCommentsLikesController.create
); // like a comment
postsCommentsLikesRouter.delete(
  "/",
  checkAuth,
  postsCommentsLikesController.delete
); // unlike a comment
