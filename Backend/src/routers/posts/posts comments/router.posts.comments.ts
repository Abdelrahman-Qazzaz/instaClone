import express from "express";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { postsCommentsLikesRouter } from "./posts comments likes/router.posts.comments.likes.ts";
import { postsCommentsController } from "src/controllers/posts/posts comments/controller.posts.comments.ts";

export const postsCommentsRouter = express.Router();

/* ( /posts/:post_id/comments/:comment_id/likes ) */
postsCommentsRouter.use("/:comment_id/likes", postsCommentsLikesRouter);

postsCommentsRouter.get("/", postsCommentsController.get); // will probably be paginated
postsCommentsRouter.get("/:comment_id", postsCommentsController.getById);

postsCommentsRouter.post("/", checkAuth, postsCommentsController.create);
// reply
postsCommentsRouter.post(
  "/:comment_id",
  checkAuth,
  postsCommentsController.create
);

postsCommentsRouter.patch(
  "/:comment_id",
  checkAuth,
  postsCommentsController.update
);

postsCommentsRouter.delete(
  "/:comment_id",
  checkAuth,
  postsCommentsController.delete
);

/*
  addComment: ReqHandler = async (req, res) => {};
  
   */

/*
comment_toggleLike: ReqHandler = async (req, res) => {};
 */
