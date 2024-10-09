import express from "express";
import { chatsController } from "src/controllers/chats/controller.chats.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { chatsMembersRouter } from "./chats members/router.chats.members.ts";
import { chatsMessagesRouter } from "./chats messages/router.chats.messages.ts";
import { checkChatAdmin } from "src/middleware/chats/checkChatAdmin.ts";
import multer from "multer";
export const upload = multer({ dest: "uploads/" });

import { uploadFile } from "src/middleware/handleFileUpload.ts";

export const chatsRouter = express.Router();

chatsRouter.use("/:chat_id/members", chatsMembersRouter);
chatsRouter.use("/:chat_id/messages", chatsMessagesRouter);

chatsRouter.get("/", checkAuth, chatsController.get); // get all the chats that you're a part of.

chatsRouter.post(
  "/",
  checkAuth,
  upload.single("file"),
  uploadFile,
  chatsController.create
);

chatsRouter.delete(
  "/:chat_id",
  checkAuth,
  checkChatAdmin,
  chatsController.delete
);

chatsRouter.patch(
  "/:chat_id",
  checkAuth,
  checkChatAdmin,
  upload.single("file"),
  uploadFile,
  chatsController.update
);
