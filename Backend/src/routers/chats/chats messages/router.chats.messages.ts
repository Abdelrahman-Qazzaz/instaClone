import express from "express";
import { chatsMessagesController } from "src/controllers/chats/chats messages/controller.chats.messages.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";

export const chatsMessagesRouter = express.Router();

chatsMessagesRouter.get("/", checkAuth, chatsMessagesController.get);
chatsMessagesRouter.post("/", checkAuth, chatsMessagesController.create);
chatsMessagesRouter.patch(
  "/:message_id",
  checkAuth,
  chatsMessagesController.update
);
chatsMessagesRouter.delete(
  "/:message_id",
  checkAuth,
  chatsMessagesController.delete
);
