import express from "express";
import { authController } from "src/controllers/controller.auth.ts";

export const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);
