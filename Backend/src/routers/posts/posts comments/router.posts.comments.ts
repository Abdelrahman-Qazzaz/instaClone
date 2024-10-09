import express from "express";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { postsCommentsLikesRouter } from "./posts comments likes/router.posts.comments.likes.ts";
import { postsCommentsController } from "src/controllers/posts/posts comments/controller.posts.comments.ts";
import { Compare_reqUserId_To_postCommentUserId } from "src/middleware/posts/posts comments/Compare_reqUserId_To_postCommentUserId.ts";
import multer from "multer";
export const upload = multer({ dest: "uploads/" });
import { uploadFile } from "src/middleware/handleFileUpload.ts";

export const postsCommentsRouter = express.Router();

/* ( /posts/:post_id/comments/:comment_id/likes ) */
postsCommentsRouter.use("/:comment_id/likes", postsCommentsLikesRouter);

postsCommentsRouter.get("/", postsCommentsController.get); // will probably be paginated
postsCommentsRouter.get("/:comment_id", postsCommentsController.getById);

postsCommentsRouter.post(
  "/",
  checkAuth,
  upload.single("file"),
  uploadFile,
  postsCommentsController.create
);

// reply
postsCommentsRouter.post(
  "/:comment_id",
  checkAuth,
  upload.single("file"),
  uploadFile,
  postsCommentsController.create
);

postsCommentsRouter.patch(
  "/:comment_id",
  checkAuth,
  Compare_reqUserId_To_postCommentUserId,
  upload.single("file"),
  uploadFile,
  postsCommentsController.update
);

postsCommentsRouter.delete(
  "/:comment_id",
  checkAuth,
  Compare_reqUserId_To_postCommentUserId,
  postsCommentsController.delete
);
