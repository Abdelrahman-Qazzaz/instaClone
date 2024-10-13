import express from "express";
import { usersController } from "../controllers/controller.users.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { Compare_reqUserId_To_reqParamsId } from "src/middleware/users/Compare_reqUserId_To_reqParamsId.ts";
import { uploadFile } from "src/middleware/handleFileUpload.ts";
import multer from "multer";
export const upload = multer({ dest: "uploads/" });

export const usersRouter = express.Router();

usersRouter.get("/", usersController.get);

usersRouter.get("/:user_id/stories", usersController.getStories);

usersRouter.get("/:user_id", usersController.getById);

usersRouter.patch(
  "/:user_id",
  checkAuth,
  Compare_reqUserId_To_reqParamsId,
  upload.single("file"),
  uploadFile,
  usersController.update
);

usersRouter.delete(
  "/:user_id",
  checkAuth,
  Compare_reqUserId_To_reqParamsId,
  usersController.delete
);
