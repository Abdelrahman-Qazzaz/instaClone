import express from "express";
import * as postsController from "../controller/controller.posts.js";

export const postsRouter = express.Router();

postsRouter.get("/fyp", postsController.fypGetPosts);
postsRouter.get("/suggestions", postsController.fetchSuggestions);
postsRouter.get("/:post_id", postsController.getById);

postsRouter.post("/:post_id/comments", postsController.addComment);

postsRouter.patch("/:post_id/likes", postsController.likeUnlike);
postsRouter.patch(
  "/:post_id/comments/:commentID/likes",
  postsController.commentLikeunLike
);

postsRouter.patch(
  "/:post_id/comments/:commentID/replies/:replyID/likes",
  postsController.replyLikeunLike
);

postsRouter.post(
  "/:post_id/comments/:commentId/replies",
  postsController.addReplyToComment
);
