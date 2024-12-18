import express from "express";
import { postsController } from "src/controllers/posts/controller.posts.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";

import { postsLikesRouter } from "./posts likes/router.posts.likes.ts";
import { postsCommentsRouter } from "./posts comments/router.posts.comments.ts";
import { Compare_reqUserId_To_postUserId } from "src/middleware/posts/Compare_reqUserId_To_postUserId.ts";
import multer from "multer";
export const upload = multer({ dest: "uploads/" });
import { uploadFile, uploadFiles } from "src/middleware/handleFileUpload.ts";
import { parseReqBodyJSON } from "src/middleware/parseReqBodyJSON.ts";

export const postsRouter = express.Router();

/* ( /posts/:post_id/likes ) */
postsRouter.use("/:post_id/likes", postsLikesRouter);
/* ( /posts/:post_id/comments ) */
postsRouter.use("/:post_id/comments", postsCommentsRouter);

postsRouter.get("/", postsController.get);
postsRouter.get("/:post_id", postsController.getById);
postsRouter.post(
  "/",
  checkAuth,
  upload.array("files"),
  uploadFiles,
  parseReqBodyJSON,
  postsController.create
);

postsRouter.patch(
  "/:post_id",
  checkAuth,
  Compare_reqUserId_To_postUserId,
  upload.array("files"),
  uploadFiles,
  postsController.update
);
postsRouter.delete(
  "/:post_id",
  checkAuth,
  Compare_reqUserId_To_postUserId,
  postsController.delete
);
