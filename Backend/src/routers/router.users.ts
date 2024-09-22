import express from "express";
import { uploadImage, uploadImagesAndVids } from "../upload.ts";
import * as userController from "../controllers/controller.users.ts";
import { checkAuth } from "../auth.ts";

export const usersRouter = express.Router();

usersRouter.get("/", userController.get);
usersRouter.post("/", userController.add);
