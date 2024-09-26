import express from "express";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { postsCommentsLikesRouter } from "./router.posts.comments.likes.ts";

export const postsCommentsRouter = express.Router();

/* ( /posts/:id/comments/:id/likes ) */
postsCommentsRouter.use("/:id/likes", postsCommentsLikesRouter);

postsCommentsRouter.get("/"); // will probably be paginated
postsCommentsRouter.post("/", checkAuth);
postsCommentsRouter.patch("/:id", checkAuth);
postsCommentsRouter.delete("/:id", checkAuth);

/*
  addComment: ReqHandler = async (req, res) => {};
  
   */

/*
comment_toggleLike: ReqHandler = async (req, res) => {};
 */
