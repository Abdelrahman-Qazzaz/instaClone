import express from "express";
import { chatsMembersController } from "src/controllers/chats/chats members/controller.chats.members.ts";
import { checkChatAdmin } from "src/middleware/chats/checkChatAdmin.ts";
import { checkChatMember } from "src/middleware/chats/checkChatMember.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";

export const chatsMembersRouter = express.Router();

chatsMembersRouter.get(
  "/",
  checkAuth,
  checkChatMember,
  chatsMembersController.get
);
chatsMembersRouter.post(
  "/",
  checkAuth,
  checkChatAdmin,
  chatsMembersController.create
);
chatsMembersRouter.patch(
  "/:member_id",
  checkAuth,
  checkChatAdmin,
  chatsMembersController.update
);
chatsMembersRouter.delete(
  "/:member_id",
  checkAuth,
  checkChatAdmin,
  chatsMembersController.delete
);
