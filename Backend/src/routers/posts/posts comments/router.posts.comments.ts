import express from "express";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { postsCommentsLikesRouter } from "./router.posts.comments.likes.ts";
import { postsCommentsController } from "src/controllers/posts/posts comments/controller.posts.comments.ts";

export const postsCommentsRouter = express.Router();

/* ( /posts/:id/comments/:id/likes ) */
postsCommentsRouter.use("/:id/likes", postsCommentsLikesRouter);

postsCommentsRouter.get("/", postsCommentsController.get); // will probably be paginated
postsCommentsRouter.post("/", checkAuth, postsCommentsController.create);
postsCommentsRouter.patch("/:comment_id", checkAuth);
postsCommentsRouter.delete("/:comment_id", checkAuth);

/*
  addComment: ReqHandler = async (req, res) => {};
  
   */

/*
comment_toggleLike: ReqHandler = async (req, res) => {};
 */
