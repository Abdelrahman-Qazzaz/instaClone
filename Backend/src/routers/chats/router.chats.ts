import express from "express";
import { uploadImagesAndVids } from "../../upload.ts";
import { chatsController } from "src/controllers/chats/controller.chats.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { chatsMembersRouter } from "./chats members/router.chats.members.ts";
import { chatsMessagesRouter } from "./chats messages/router.chats.messages.ts";
import { checkChatAdmin } from "src/middleware/chats/checkChatAdmin.ts";

export const chatsRouter = express.Router();

// for the protected routes, the form of auth here is to use middleware to check whether the req.user.id is an admin in the targeted chat or not

chatsRouter.use("/:chat_id/members", chatsMembersRouter);
chatsRouter.use("/:chat_id/messages", chatsMessagesRouter);

chatsRouter.get("/", checkAuth, chatsController.get); // get all the chats that you're a part of.

chatsRouter.post("/", checkAuth, chatsController.create);

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
  chatsController.update
);
