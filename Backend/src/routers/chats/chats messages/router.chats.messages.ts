import express from "express";
import { chatsMessagesController } from "src/controllers/chats/chats messages/controller.chats.messages.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { checkChatAdmin } from "src/middleware/chats/checkChatAdmin.ts";
import { checkChatMember } from "src/middleware/chats/checkChatMember.ts";
import { Compare_reqUserId_To_messageUserId } from "src/middleware/chats/chats messages/Compare_reqUserId_To_messageUserId.ts";

export const chatsMessagesRouter = express.Router();

chatsMessagesRouter.get(
  "/",
  checkAuth,
  checkChatMember,
  chatsMessagesController.get
);
chatsMessagesRouter.post(
  "/",
  checkAuth,
  checkChatMember,
  chatsMessagesController.create
);
chatsMessagesRouter.patch(
  "/:message_id",
  checkAuth,
  checkChatMember,
  Compare_reqUserId_To_messageUserId,
  chatsMessagesController.update
);
chatsMessagesRouter.delete(
  "/:message_id",
  checkAuth,
  checkChatMember,
  Compare_reqUserId_To_messageUserId,
  chatsMessagesController.delete
);
