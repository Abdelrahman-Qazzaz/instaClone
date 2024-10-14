import express from "express";
import { storiesController } from "src/controllers/stories/controller.stories.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";

import { uploadFile } from "src/middleware/handleFileUpload.ts";
import multer from "multer";
import { Compare_reqUserId_To_storyUserId } from "src/middleware/stories/Compare_reqUserId_To_storyUserId.ts";
export const upload = multer({ dest: "uploads/" });

export const storiesRouter = express.Router();

storiesRouter.get("/:user_id", storiesController.getByUserId);

storiesRouter.post(
  "/",
  checkAuth,
  upload.single("file"),
  uploadFile,
  storiesController.create
);

storiesRouter.delete(
  "/:id",
  checkAuth,
  Compare_reqUserId_To_storyUserId,
  storiesController.delete
);
