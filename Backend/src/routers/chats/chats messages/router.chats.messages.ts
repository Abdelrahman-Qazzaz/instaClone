import express from "express";
import { checkAuth } from "src/middleware/checkAuth.ts";

export const chatsMessagesRouter = express.Router();

chatsMessagesRouter.get("/", checkAuth, chatsMessagesController.get);
chatsMessagesRouter.post("/", checkAuth, chatsMessagesController.create);
chatsMessagesRouter.patch("/", checkAuth, chatsMessagesController.update);
chatsMessagesRouter.delete("/", checkAuth, chatsMessagesController.delete);

// try {
//   const { where } = args;
//   const chat: ExtendedChat | null = await db.chats.findFirst({
//     where,
//     include: { chats_members: true, chats_messages: true },
//   });
//   return [null, chat];
// } catch (error) {
//   console.log(error);
//   return [error, null];
// }
