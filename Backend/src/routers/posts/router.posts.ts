import express from "express";
import { postsController } from "src/controllers/posts/controller.posts.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { Compare_reqUserId_To_postUserId } from "src/middleware/compareNumToReqUserId.ts";
import { postsLikesRouter } from "./router.posts.likes.ts";
import { postsCommentsRouter } from "./posts comments/router.posts.comments.ts";

export const postsRouter = express.Router();

/* ( /posts/:id/likes ) */
postsRouter.use("/:id/likes", postsLikesRouter);
/* ( /posts/:id/comments ) */
postsRouter.use("/:id/comments", postsCommentsRouter);

postsRouter.get("/", postsController.get);

postsRouter.get("/:id", postsController.getById);

postsRouter.patch(
  "/:id",
  checkAuth,
  Compare_reqUserId_To_postUserId,
  postsController.update
);

postsRouter.delete(
  "/:id",
  checkAuth,
  Compare_reqUserId_To_postUserId,
  postsController.delete
);
