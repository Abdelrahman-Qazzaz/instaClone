import express from "express";
import * as postsController from "../controllers/controller.posts.ts";
import { checkAuth } from "../auth.ts";

export const postsRouter = express.Router();

postsRouter.get("/fyp", checkAuth, postsController.fypGetPosts);
postsRouter.get("/suggestions", postsController.fetchSuggestions);
postsRouter.get("/:post_id", postsController.getById);

postsRouter.post("/:post_id/comments", checkAuth, postsController.addComment);

postsRouter.patch("/:post_id/likes", checkAuth, postsController.likeUnlike);
postsRouter.patch(
  "/:post_id/comments/:commentID/likes",
  checkAuth,
  postsController.commentLikeunLike
);

postsRouter.patch(
  "/:post_id/comments/:commentID/replies/:replyID/likes",
  checkAuth,
  postsController.replyLikeunLike
);

postsRouter.post(
  "/:post_id/comments/:commentId/replies",
  checkAuth,
  postsController.addReplyToComment
);
