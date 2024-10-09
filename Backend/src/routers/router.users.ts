import express from "express";
import { usersController } from "../controllers/controller.users.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { Compare_reqUserId_To_reqParamsId } from "src/middleware/users auth/Compare_reqUserId_To_reqParamsId.ts";
import { uploadFile } from "src/middleware/handleFileUpload.ts";
import multer from "multer";
export const upload = multer({ dest: "uploads/" });

export const usersRouter = express.Router();

usersRouter.get("/", usersController.get);

usersRouter.get("/:id", usersController.getById);

usersRouter.patch(
  "/:id",
  checkAuth,
  Compare_reqUserId_To_reqParamsId,
  upload.single("file"),
  uploadFile,
  usersController.update
);

usersRouter.delete(
  "/:id",
  checkAuth,
  Compare_reqUserId_To_reqParamsId,
  usersController.delete
);
