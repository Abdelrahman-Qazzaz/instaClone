import express from "express";
import { uploadImagesAndVids } from "../upload.ts";
import * as chatsController from "../controllers/controller.chats.ts";
import { checkAuth } from "../auth.ts";

export const chatsRouter = express.Router();

chatsRouter.get("/:chat_id", chatsController.getById);

chatsRouter.post("/", chatsController.createChat);
chatsRouter.post("/:chat_id/messages", checkAuth, uploadImagesAndVids);
