import express from "express";
import { uploadImagesAndVids } from "../upload.js";
import * as chatsController from "../controller/controller.chats.js";

export const chatsRouter = express.Router();

chatsRouter.post("/", chatsController.createChat);
chatsRouter.post("/:chat_id/messages", uploadImagesAndVids);

chatsRouter.get("/:chat_id", chatsController.getById);
