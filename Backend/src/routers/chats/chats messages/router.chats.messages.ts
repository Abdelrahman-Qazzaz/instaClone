import express from "express";
import { chatsMessagesController } from "src/controllers/chats/chats messages/controller.chats.messages.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { checkChatAdmin } from "src/middleware/chats/checkChatAdmin.ts";
import { checkChatMember } from "src/middleware/chats/checkChatMember.ts";
export const chatsMessagesRouter = express.Router();

// for the protected routes, the form of auth here is to use middleware to check whether the req.user.id is a member of the targeted chat or not

chatsMessagesRouter.get("/", checkAuth, chatsMessagesController.get);
chatsMessagesRouter.post("/", checkAuth, chatsMessagesController.create);
chatsMessagesRouter.patch(
  "/:message_id",
  checkAuth,
  checkChatMember,
  chatsMessagesController.update
);
chatsMessagesRouter.delete(
  "/:message_id",
  checkAuth,
  checkChatAdmin,
  chatsMessagesController.delete
);
