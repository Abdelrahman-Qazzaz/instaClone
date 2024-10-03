import express from "express";
import { checkChatAdmin } from "src/middleware/chats/checkChatAdmin.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";

export const chatsMembersRouter = express.Router();
// for the protected routes, the form of auth here is to use middleware to check whether the req.user.id is an admin in the targeted chat or not

chatsMembersRouter.get("/", checkAuth, chatsMembersController.get);
chatsMembersRouter.post("/", checkAuth, chatsMembersController.create);
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
